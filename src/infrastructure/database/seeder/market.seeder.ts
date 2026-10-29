import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import { Market } from "src/domain/market.entity";
import { Repository } from "typeorm";

const markets = [{name:'jio'}]
@Injectable()
export class MarketSeeder implements Seeder {

    constructor(
        @InjectRepository(Market) 
        private readonly marketRepository: Repository<Market>
    ) {

    }

    async seed(): Promise<any> {
        await this.marketRepository.save(markets)
    }

    async drop(): Promise<any> {
        
    }
}