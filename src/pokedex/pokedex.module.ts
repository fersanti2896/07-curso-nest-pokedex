import { Module } from '@nestjs/common';
import { PokedexService } from './pokedex.service';
import { PokedexController } from './pokedex.controller';

@Module({
  controllers: [PokedexController],
  providers: [PokedexService],
})
export class PokedexModule {}
