import { Test, TestingModule } from '@nestjs/testing';
import { DeckService } from './deck.service';
import { Repository } from 'typeorm';
import { Deck } from './entities/deck.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDeckDto } from './dtos/create-deck.dto';

describe('DeckService', () => {
  let service: DeckService;
  let repository: Repository<Deck>;

  beforeEach(async () => {
    const fakeDeckServiceprovider = {
      provide: DeckService,
      useFactory: () => ({
        createDeckCards: jest.fn(() => []),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeckService,
        {
          provide: getRepositoryToken(Deck),
          useClass: Repository,
        },
        fakeDeckServiceprovider,
      ],
    }).compile();

    service = module.get<DeckService>(DeckService);
    repository = module.get<Repository<Deck>>(getRepositoryToken(Deck));
  });

  it('can create instance of deck service', async () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('creates a card deck and return deck dto', async () => {
      const createDeckDto: CreateDeckDto = {
        shuffled: true,
        type: 'FULL',
        cards: undefined,
        remaining: 0,
      };

      const CardDeckMock: Deck = {
        id: 1,
        deckId: 'a1sfs-sf',
        shuffled: true,
        type: 'FULL',
        remaining: 52,
        cards: [],
        LogInsert: function (): void {
          throw new Error('Function not implemented.');
        },
      };

      const expectedResult: Deck = {
        deckId: CardDeckMock.deckId,
        shuffled: CardDeckMock.shuffled,
        type: CardDeckMock.type,
        remaining: CardDeckMock.remaining,
        id: 0,
        cards: undefined,
        LogInsert: function (): void {
          throw new Error('Function not implemented.');
        },
      };

      jest.spyOn(repository, 'create').mockImplementation(() => CardDeckMock);
      jest
        .spyOn(repository, 'save')
        .mockImplementation(async () => CardDeckMock);

      const response: Deck = await service.create(createDeckDto);

      expect(repository.create).toHaveBeenCalledWith(createDeckDto);
      expect(service.create).toHaveBeenCalledWith(
        CardDeckMock.id,
        createDeckDto.type,
        createDeckDto.shuffled,
      );
      expect(response).toEqual(expectedResult);
    });
  });
});
