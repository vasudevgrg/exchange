export class CreateOrderDto {
  uuid?: string;
  user_id: number;
  market_id?: number;
  market?: string;
  quantity: number;
  fulfilled_quantity?: number;
}
