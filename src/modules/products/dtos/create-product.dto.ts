import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'
export class CreateProductDto{

  @ApiProperty()
  @IsNotEmpty()
  name: string
  @ApiProperty()
  @IsNotEmpty()
  description: string
  @ApiProperty()
  @IsNumber()
  price: number
  @ApiProperty()
  @IsNumber()
  stock: number
  @ApiProperty()
  @IsNotEmpty()
  category: string;
  imageUrl?:string
}