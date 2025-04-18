import { Category, Fornecedor, Model, Product } from '@prisma/client';
import { ResponseProductDto } from '../dtos/response-product.dto';
import { ResponseClientProductDto } from '../dtos/response-client-product.dto';

export class ProductMapperClient {
  
  async parseToDto(
    product: Product & {
      category: Category;
      fornecedores: { fornecedor: Fornecedor }[];
      models: { model: Model }[];
    }
  ): Promise<ResponseClientProductDto> {
    return {
      id: product.id,
      code: product.code,
      name: product.name,
      imgUrl: product.imageUrl,
      categoria: {
        id:product.category.id,
        name: product.category.name
      },
      descricao: product.description,
      fornecedores: product.fornecedores.map((p) => ({
        id: p.fornecedor.id,
        name: p.fornecedor.name,
        code: p.fornecedor.code,
      })),
      modelos: product.models.map((m) => ({
        id: m.model.id,
        name: m.model.name,
        marca: m.model.marca,
        ano: m.model.ano,
      })),
      tipo: product.tipo,
    };
  }

  async parseListToDto(
    products: (Product & {
      category: Category;
      fornecedores: { fornecedor: Fornecedor }[];
      models: { model: Model }[];
    })[]
  ): Promise<ResponseClientProductDto[]> {
    return Promise.all(
      products.map((product) =>
        this.parseToDto(product)
      )
    );
  }
}
