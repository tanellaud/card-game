import { IsString, IsBoolean } from 'class-validator';

export class CreateDeckDto {
  @IsString()
  type: string;

  @IsBoolean()
  shuffled: boolean;
}
