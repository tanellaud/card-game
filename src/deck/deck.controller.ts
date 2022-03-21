import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { DeckService } from './deck.service';
import { DrawCardDto } from './dtos/draw-card.dto';

@Controller('deck')
export class DeckController {
  constructor(private deckService: DeckService) {}

  @Get('/:uuid')
  getDeck(@Param('uuid') uuid: string) {
    return this.deckService.getByUuid(uuid);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  createDeck(@Body() createDeckDto: CreateDeckDto) {
    return this.deckService.create(createDeckDto);
  }

  @Get('/:uuid/draw-card')
  public async drawCard(
    @Param('uuid') uuid: string,
    @Body() drawCardDto: DrawCardDto,
  ) {
    return {
      cards: await this.deckService.getTopCardsAndDelete(uuid, drawCardDto),
    };
  }
}
