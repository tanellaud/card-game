import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';
import { stringify } from 'querystring';

@Injectable()
export class DeckService {
  constructor(@InjectRepository(Deck) private repo: Repository<Deck>) {}

  create(type: string, shuffled: boolean) {
    const deck = this.repo.create({ type, shuffled });

    return this.repo.save(deck);
  }
}
