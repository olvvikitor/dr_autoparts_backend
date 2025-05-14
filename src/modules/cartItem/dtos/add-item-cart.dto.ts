import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class AddItemCartDto{

  @ApiProperty()
  @IsNumber()
  productId: number

  @ApiProperty()
  @IsNumber()
  quantity:number

}