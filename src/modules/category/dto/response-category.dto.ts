import { ApiProperty } from '@nestjs/swagger'

export class ResponseCategoryDto{
  @ApiProperty({
    example: 1,
    description: 'Id da categoria'
  })
  id: number

  @ApiProperty({
    example: 'Acessórios',
    description: 'nome da categoria'
  })
  name:string
}