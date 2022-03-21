import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { DeckService } from './deck.service';

@Controller('deck')
export class DeckController {
  constructor(private deckService: DeckService) {}

  @Post()
  createDeck(@Body() body: CreateDeckDto) {
    this.deckService.create(body.type, body.shuffled);
  }
}
