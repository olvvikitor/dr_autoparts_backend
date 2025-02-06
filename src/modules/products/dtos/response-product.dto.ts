import { ApiProperty } from '@nestjs/swagger'

export class ResponseProductDto{
  @ApiProperty()
  id:number
  @ApiProperty()
  name:string
  @ApiProperty()
  imgUrl?:string
}