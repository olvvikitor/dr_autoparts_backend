import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto{
  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Condutores'
  })
  @IsString()
  @IsNotEmpty()
  name: string
}