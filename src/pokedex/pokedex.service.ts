import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePokedexDto, UpdatePokedexDto } from './dto';
import { Pokedex } from './entities/pokedex.entity';

@Injectable()
export class PokedexService {
  constructor(
    @InjectModel( Pokedex.name )
    private readonly pokedexModel: Model<Pokedex>
  ) {}

  async create( createPokedexDto: CreatePokedexDto ) {
    createPokedexDto.name = createPokedexDto.name.toLocaleLowerCase();

    try {
      const pokedex = await this.pokedexModel.create( createPokedexDto );
  
      return pokedex;
    } catch (error) {
      if( error.code === 11000 ) {
        throw new BadRequestException(`El pokemon ya existe en la BD: ${ JSON.stringify( error.keyValue ) }`)
      }

      throw new InternalServerErrorException(`No se pudo crear el pokemon - Verique Logs del Server`)
    }
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
