import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { DrawCardDto } from './dtos/draw-card.dto';
import { shuffle } from 'lodash';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(Deck)
    private repo: Repository<Deck>,
  ) {}

  public create(createDeckDto: CreateDeckDto) {
    try {
      const deck: Deck = this.repo.create(createDeckDto);

      if (deck.type === 'SHORT') {
        const NumbersToRemove = [2, 3, 4, 5];

        deck.cards = deck.cards.filter(
          (i) => !NumbersToRemove.includes(i.value),
        );
      }

      if (deck.shuffled) {
        deck.cards = shuffle(deck.cards);
      }

      deck.remaining = Object.keys(deck.cards).length;

      return this.repo.save(deck);
    } catch (error) {
      console.error('Failed to create a card deck', {
        error,
        ...createDeckDto,
      });
    }
  }

  public async getByUuid(uuid: string) {
    const query: SelectQueryBuilder<Deck> = await this.repo
      .createQueryBuilder('deck')
      .where('deck.deckId = :uuid', { uuid });

    const deck: Deck = await query.getOne();

    if (!deck) {
      throw new NotFoundException();
    }

    const getDeckLength = Object.keys(deck.cards).length;

    const deckModified = {
      deckId: deck.deckId,
      type: deck.type,
      shuffled: deck.shuffled,
      remaining: getDeckLength,
      cards: deck.cards,
    };

    return deckModified;
  }

  async getDeckTopCardsAndRemove(uuid: string, drawCardDto: DrawCardDto) {
    const deck: Deck = await this.repo.findOne({
      where: {
        deckId: uuid,
      },
    });

    if (!deck) {
      throw new NotFoundException();
    }

    const drawnCards = deck.cards.slice(0, drawCardDto.count);

    const drawnCardsIds = drawnCards.map((item) => {
      return item.id;
    });

    deck.cards = deck.cards.filter((card, index) => {
      return card.id !== drawnCardsIds[index];
    });

    this.repo.save(deck);

    return drawnCards;
  }
}
