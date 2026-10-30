import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './infrastructure/database/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from './domain/market.entity';
import { Order } from './domain/order.entity';
import { Trade } from './domain/trade.entity';
import { User } from './domain/user.entity';
import { BuyOrderModule } from './features/buy-order/buy-order.module';
import { CreateOrderModule } from './features/create-order/create-order.module';
import { FillOrdersModule } from './features/fill-orders/fill-orders.module';

@Module({
    imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('database.host'),
        port: config.getOrThrow<number>('database.port'),
        username: config.getOrThrow<string>('database.user'),
        password: config.getOrThrow<string>('database.password'),
        database: config.getOrThrow<string>('database.name'),
        entities: [User, Market, Order, Trade],
        synchronize: false,
      }),
    }),
    BuyOrderModule,
    CreateOrderModule,
    FillOrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
