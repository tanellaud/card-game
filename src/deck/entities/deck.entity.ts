import {
  AfterInsert,
  Entity,
  Column,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class Deck {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'uuid',
  })
  @Generated('uuid')
  deckId: string;

  @Column({
    default: 'FULL',
    type: 'enum',
    enum: ['FULL', 'SHORT'],
  })
  type: string;

  @Column({
    type: 'boolean',
  })
  shuffled: boolean;

  @Column({
    default: 0,
  })
  remaining: number;

  @Exclude()
  @Column({ type: 'json', name: 'cards', default: null })
  cards: any;

  @AfterInsert()
  LogInsert() {
    console.log('inserted deck with id', this.deckId);
  }
}
