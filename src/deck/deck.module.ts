import { Module } from '@nestjs/common';
import { DeckController } from './deck.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckService } from './deck.service';
import { Deck } from './entities/deck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deck])],
  controllers: [DeckController],
  providers: [DeckService],
})
export class DeckModule {}
