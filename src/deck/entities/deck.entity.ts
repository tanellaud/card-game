import { Entity, Column, Generated, PrimaryGeneratedColumn } from 'typeorm';

export enum DeckTypeEnum {
  FULL = 'FULL',
  SHORT = 'SHORT',
}

@Entity()
export class Deck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'uuid',
  })
  @Generated('uuid')
  deckId: string;

  @Column()
  type: string;

  @Column({
    type: 'boolean',
  })
  shuffled: boolean;

  @Column('json', {
    array: true,
  })
  cards: Array<any>;
}
