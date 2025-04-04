import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateFornecedorDto{
  @ApiProperty({
    description: 'Nome do fornecedor',
    required: true,
    example: 'Pireli'
    })
  @IsString()
  @IsNotEmpty()
  name: string
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Código do fornecedor',
    required: true,
    example: 'P45704'
    })
  code:string
}
