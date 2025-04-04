import { ApiProperty } from '@nestjs/swagger';
import { TipoUnidade } from '@prisma/client';
import { ResponseFornecedorDto } from 'src/modules/fornecedor/dto/response-fornecedor.dto';

export class RespondeModelDto {
  @ApiProperty({ description: 'Nome do modelo' })
  name: string;

  @ApiProperty({ description: 'Marca do modelo' })
  marca: string;

  @ApiProperty({ description: 'Ano do modelo' })
  ano: string;
}

export class ResponseProductDto {
  @ApiProperty({ description: 'ID do produto', example: 1 })
  id: number;

  @ApiProperty({ description: 'Código do produto', example: 'XP34582J' })
  code: string;

  @ApiProperty({ description: 'Descrição do produto', example: 'melhor cambio x' })
  descricao: string;

  @ApiProperty({ description: 'Tipo de unidade do produto', enum: TipoUnidade, example: TipoUnidade.PECA })
  tipo: TipoUnidade;

  @ApiProperty({ description: 'Lista de modelos do produto', type: [RespondeModelDto] })
  modelos: RespondeModelDto[];

  @ApiProperty({ description: 'Lista de fornecedores do produto', type: [ResponseFornecedorDto] })
  fornecedores: ResponseFornecedorDto[];

  @ApiProperty({ description: 'Preço do produto', example: 150.75 })
  price: number;

  @ApiProperty({ description: 'Custo do produto', example: 100.50 })
  pricecoast: number;

  @ApiProperty({ description: 'Categoria do produto', example: 'Eletrico' })
  categoria: string;

  @ApiProperty({ description: 'Nome do produto', example: 'Cambio XYZ' })
  name: string;

  @ApiProperty({ description: 'URL da imagem do produto', required: true, example: 'https://example.com/image.jpg' })
  imgUrl: string;
}
