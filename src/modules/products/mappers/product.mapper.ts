import { Category, Fornecedor, Model, Product } from '@prisma/client';
import { ResponseProductDto } from '../dtos/response-product.dto';

export class ProductMapper{
  async parseToDto(product:Product & {category:Category, fornecedor:Fornecedor[], modelos:Model[]} ):Promise<ResponseProductDto>{
    
    return {
      id: product.id,
      name:product.name,
      imgUrl: product.imageUrl,
      categoria: product.category.name,
      descricao: product.description,
      fornecedores: product.fornecedor.map((p) =>{
        return{
          name: p.name,
          code: p.code
        }
      }),
      modelos:product.modelos,
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
              name: f.fornecedor.name,
              code: f.fornecedor.code,
              // Você pode adicionar mais propriedades aqui, caso queira
            };
          }),
          modelos: product.models.map((m) => {
            return {
              name: m.model.name,
              marca: m.model.marca,
              ano: m.model.ano
              // Adicione outras propriedades de "modelo" se necessário
            };
          }),
          tipo: product.tipo,
        };
      })
    );
  
    return productsTransform;
  }
  
}