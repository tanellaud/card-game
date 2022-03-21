import { IsNotEmpty, IsNumber } from 'class-validator';

export class DrawCardDto {
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
