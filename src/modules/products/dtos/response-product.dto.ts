import { ApiProperty } from '@nestjs/swagger';
import { TipoUnidade } from '@prisma/client';
import { ResponseFornecedorDto } from 'src/modules/fornecedor/dto/response-fornecedor.dto';
import { Response } from 'src/modules/modelo/dto/response-modelo-dto copy';



export class ResponseProductDto {
  @ApiProperty({ description: 'ID do produto', example: 1 })
  id: number;

  @ApiProperty({ description: 'Descrição do produto', example: 'melhor cambio x' })
  descricao: string;

  @ApiProperty({ description: 'Tipo de unidade do produto', enum: TipoUnidade, example: TipoUnidade.PECA})
  tipo: TipoUnidade;

  @ApiProperty({ description: 'Lista de modelos do produto', type: [Response] })
  modelos: Response[];

  @ApiProperty({ description: 'Lista de fornecedores do produto', type: [ResponseFornecedorDto] })
  fornecedores: ResponseFornecedorDto[];

  @ApiProperty({ description: 'Categoria do produto', example: 'Eletrico' })
  categoria: string;

  @ApiProperty({ description: 'Nome do produto', example: 'Cambio XYZ' })
  name: string;

  @ApiProperty({ description: 'URL da imagem do produto', required: true, example: 'https://example.com/image.jpg'  })
  imgUrl: string;
}
