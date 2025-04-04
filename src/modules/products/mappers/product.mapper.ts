import { Category, Fornecedor, Model, Product } from '@prisma/client';
import { ResponseProductDto } from '../dtos/response-product.dto';

export class ProductMapper {
  async parseToDto(
    product: Product & {
      category: Category;
      fornecedores: { fornecedor: Fornecedor }[];
      models: { model: Model }[];
    }
  ): Promise<ResponseProductDto> {
    return {
      id: product.id,
      code: product.code,
      name: product.name,
      imgUrl: product.imageUrl,
      categoria: product.category.name,
      descricao: product.description,
      price: product.price,
      pricecoast: product.priceoast,
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
  ): Promise<ResponseProductDto[]> {
    return Promise.all(
      products.map((product) =>
        this.parseToDto(product)
      )
    );
  }
}
