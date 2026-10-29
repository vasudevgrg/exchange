import { Injectable } from "@nestjs/common";

type Side = 'buy' | 'sell';

interface Order {
  id: string;
  price: number;
  quantity: number;
  timestamp: number;
}

interface MarketOrders {
  buy: Order[];
  sell: Order[];
}

interface Fill {
  order: Order; 
  quantity: number;
}

@Injectable()
export class StorageHandler {
  private readonly storage: Record<string, MarketOrders> = {};

  private compare(side: Side, a: Order, b: Order): number {
    const byPrice = side === 'buy' ? b.price - a.price : a.price - b.price;
    return byPrice || a.timestamp - b.timestamp;
  }

  private getBook(market: string): MarketOrders {
    return (this.storage[market] ??= { buy: [], sell: [] });
  }

  set(value: Order, side: Side, market: string): void {
    const orders = this.getBook(market)[side];

    let lo = 0;
    let hi = orders.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (this.compare(side, orders[mid], value) <= 0) lo = mid + 1;
      else hi = mid;
    }
    orders.splice(lo, 0, value);
  }

  getBest(market: string, side: Side): Order | undefined {
    return this.storage[market]?.[side][0];
  }

  private take(
    market: string,
    side: Side,
    quantity: number,
    price: number,
  ): Fill[] {
    const orders = this.getBook(market)[side];
    const fills: Fill[] = [];
    let removeCount = 0;

    for (const order of orders) {
      if (quantity <= 0) break;

      const crosses = side === 'buy' ? order.price >= price : order.price <= price;
      if (!crosses) break;

      const qty = Math.min(quantity, order.quantity);
      fills.push({ order: { ...order }, quantity: qty });
      quantity -= qty;
      order.quantity -= qty;

      if (order.quantity === 0) removeCount++;
      else break;
    }

    if (removeCount > 0) orders.splice(0, removeCount);
    return fills;
  }

  getBuyOrders(market: string, quantity: number, price: number): Fill[] {
    return this.take(market, 'buy', quantity, price);
  }

  getSellOrders(market: string, quantity: number, price: number): Fill[] {
    return this.take(market, 'sell', quantity, price);
  }

  updateOrder(market: string, id: string, quantity: number, side: Side): boolean {
    if (quantity <= 0) throw new Error('Quantity must be positive (use cancelOrder to remove)');

    const orders = this.getBook(market)[side];
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return false;

    const order = orders[index];

    if (quantity <= order.quantity) {
      order.quantity = quantity;
    } else {
      orders.splice(index, 1);
      this.set({ ...order, quantity, timestamp: Date.now() }, side, market);
    }
    return true;
  }

  cancelOrder(market: string, id: string, side: Side): Order | null {
    const orders = this.getBook(market)[side];
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return null;

    return orders.splice(index, 1)[0];
  }
}