import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokedexModule } from './pokedex/pokedex.module';

@Module({
  imports: [ 
    ServeStaticModule.forRoot({
      rootPath: join( __dirname, '..', 'public' ),
    }), 
    PokedexModule
  ]
})
export class AppModule {}
