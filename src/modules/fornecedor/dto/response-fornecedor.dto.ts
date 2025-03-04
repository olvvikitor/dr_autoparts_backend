import { ApiProperty } from '@nestjs/swagger';

export class ResponseFornecedorDto {
  @ApiProperty({
    description: 'Nome do fornecedor',
    required: true,
    example: 'Pireli'
    })
  name: string
  @ApiProperty({
    description: 'Código do fornecedor',
    required: true,
    example: 'P45704'
    })
  code:string
}