import { Injectable } from '@nestjs/common';
import { CreatePokedexDto } from './dto/create-pokedex.dto';
import { UpdatePokedexDto } from './dto/update-pokedex.dto';

@Injectable()
export class PokedexService {
  create( createPokedexDto: CreatePokedexDto ) {
    createPokedexDto.name = createPokedexDto.name.toLocaleLowerCase();

    return createPokedexDto;
  }

  findAll() {
    return `This action returns all pokedex`;
  }

  findOne( id: number ) {
    return `This action returns a #${id} pokedex`;
  }

  update( id: number, updatePokedexDto: UpdatePokedexDto ) {
    return `This action updates a #${id} pokedex`;
  }

  remove( id: number ) {
    return `This action removes a #${id} pokedex`;
  }
}
