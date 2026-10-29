import { seeder } from "nestjs-seeder";
import { MarketSeeder } from "./market.seeder";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Market } from "src/domain/market.entity";

seeder({
  imports: [
TypeOrmModule.forFeature([ Market])
  ],
}).run([MarketSeeder]);