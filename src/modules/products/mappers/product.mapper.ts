import { Category, Fornecedor, Model, Product } from '@prisma/client';
import { ResponseProductDto } from '../dtos/response-product.dto';

export class ProductMapper{
  async parseToDto(product: (Product & { category: Category; fornecedores: { fornecedor: Fornecedor }[]; models: { model: Model }[] })):Promise<ResponseProductDto>{
    
    return {
      id: product.id,
      name:product.name,
      imgUrl: product.imageUrl,
      categoria: product.category.name,
      descricao: product.description,
      fornecedores: product.fornecedores.map((p) =>{
        return{
          id: p.fornecedor.id,
          name: p.fornecedor.name,
          code: p.fornecedor.code,
        }
      }),
      modelos:product.models.map((m) =>{
        return{
          id: m.model.id,
          ano:m.model.ano,
          marca:m.model.marca,
          name:m.model.name
        }
      }),
      tipo:product.tipo
    }
  }

  async parseListToDto(products:(Product & { category: Category; fornecedores: { fornecedor: Fornecedor }[]; models: { model: Model }[] })[]): Promise<ResponseProductDto[]> {
    const productsTransform: ResponseProductDto[] = await Promise.all(
      products.map(async (product) => {
        return {
          id: product.id,
          name: product.name,
          imgUrl: product.imageUrl,
          categoria: product.category.name,
          descricao: product.description,
          fornecedores: product.fornecedores.map((f) => {
            return {
              id: f.fornecedor.id,
              name: f.fornecedor.name,
              code: f.fornecedor.code,
            };
          }),
          modelos: product.models.map((m) => {
            return {
              id: m.model.id,
              name: m.model.name,
              marca: m.model.marca,
              ano: m.model.ano
            };
          }),
          tipo: product.tipo,
        };
      })
    );
  
    return productsTransform;
  }
  
}