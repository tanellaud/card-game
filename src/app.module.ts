import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeckModule } from './deck/deck.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './deck/entities/deck.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Deck],
      migrationsRun: true,
      synchronize: true,
    }),
    DeckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
