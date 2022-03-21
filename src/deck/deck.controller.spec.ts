import { Test, TestingModule } from '@nestjs/testing';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';
import { Deck } from './entities/deck.entity';
import { CreateDeckDto } from './dtos/create-deck.dto';
import { NotFoundException } from '@nestjs/common';

describe('DeckController', () => {
  let controller: DeckController;
  let fakeDeckService: Partial<DeckService>;

  beforeEach(async () => {

    const DeckServiceProvider = {
      provide: DeckService,
      useFactory: () => ({
        getByUuid: jest.fn(() => []),
        create: jest.fn(() => []),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeckController],
      providers: [DeckService, DeckServiceProvider],
    }).compile();

    controller = module.get<DeckController>(DeckController);
    fakeDeckService = module.get<DeckService>(DeckService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDeck', () => {
    it('get deck by uuid ', async () => {
      const uuid = 'iam-uuid';
      const expectedResult: Deck = {
        deckId: uuid,
        type: 'FULL',
        shuffled: false,
        remaining: 0,
        cards: [],
        id: 0,
        LogInsert: function (): void {
          throw new Error('Function not implemented.');
        },
      };

      jest
        .spyOn(fakeDeckService, 'getByUuid')
        .mockImplementation(async () => expectedResult);

      const deck = await controller.getDeck(uuid);

      expect(fakeDeckService.getByUuid).toHaveBeenCalled();
      expect(deck).toBe(expectedResult);
    });

    it('should throw error if card deck not found', async () => {
      jest.spyOn(fakeDeckService, 'getByUuid').mockImplementation(() => {
        throw new NotFoundException();
      });

      try {
        await controller.getDeck('1');
      } catch (error) {
        expect(fakeDeckService.getByUuid).toHaveBeenCalled();
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createDeck', () => {
    it('should return new deck', async () => {
      const expectedResult: Deck = {
        deckId: 'xxxx-xxxx-xxxx',
        type: 'FULL',
        shuffled: false,
        remaining: 52,
        id: 0,
        cards: [
          {
            id: 1,
            suit: 'hearts',
            value: 2,
          },
          {
            id: 2,
            suit: 'hearts',
            value: 3,
          },
        ],
        LogInsert: function (): void {
          throw new Error('Function not implemented.');
        },
      };
      const createDeckDto: CreateDeckDto = {
        type: 'FULL',
        shuffled: false,
        cards: [
          {
            id: 1,
            suit: 'hearts',
            value: 2,
          },
          {
            id: 2,
            suit: 'hearts',
            value: 3,
          },
        ],
        remaining: 0,
      };

      jest
        .spyOn(fakeDeckService, 'create')
        .mockImplementation(async () => expectedResult);

      const deck = await controller.createDeck(createDeckDto);

      expect(fakeDeckService.create).toHaveBeenCalledWith(createDeckDto);
      expect(deck).toBe(expectedResult);
    });
  });
});
