import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

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

  async findOne( term: string ) {
    let pokemon: Pokedex;

    /* Verificación por Número: no */
    if( !isNaN(+term) ) {
      pokemon = await this.pokedexModel.findOne({ no: term });
    }

    /* Verificacion por MongoID: _id */
    if( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokedexModel.findById( term );
    }

    /* Verificación por Nombre: name */
    if( !pokemon ) {
      pokemon = await this.pokedexModel.findOne({ name: term.toLocaleLowerCase().trim() });
    }

    if( !pokemon ) throw new NotFoundException(`Pokemon con Id, Name o No: ${ term } no encontrado.`)
    
    return pokemon;
  }

  update( id: number, updatePokedexDto: UpdatePokedexDto ) {
    return `This action updates a #${id} pokedex`;
  }

  remove( id: number ) {
    return `This action removes a #${id} pokedex`;
  }
}
