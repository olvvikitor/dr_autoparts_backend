import { ApiProperty } from '@nestjs/swagger';

export class Response {
  @ApiProperty({
    example: '1',
    description: 'id do modelo do veículo',
  })
  id: number;

  @ApiProperty({
    example: 'Civic',
    description: 'Nome do modelo do veículo',
  })
  nome: string;

  @ApiProperty({
    example: '2024',
    description: 'Ano do modelo do veículo',
  })
  ano: string;

  @ApiProperty({
    example: 'Honda',
    description: 'Marca do veículo',
  })
  marca: string;
}
