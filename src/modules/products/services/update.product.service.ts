import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CategoryService } from 'src/modules/category/services/category.service';
import { FornecedorService } from 'src/modules/fornecedor/services/fornecedor.service';
import { ModeloService } from 'src/modules/modelo/services/modelo.service';
import { ProductFornecedorRepository } from 'src/modules/productFornecedor/repositories/productFornecedor.repository';
import { ProductModelRepository } from 'src/modules/productModel/repositories/productModel.repository';

@Injectable()
export class UpdateProductService{

  constructor(
    @Inject() private productRepository: ProductRepository,
    @Inject() private productModel: ProductModelRepository,
    @Inject() private productFornecedor: ProductFornecedorRepository
  ) {}
  async execute(idProduct: number, data: CreateProductDto):Promise<void>{
    await this.productRepository.update(idProduct, data)
    await this.updateRelationsProduct(data.modelId, data.fornecedorId, idProduct)
  }
  /**
   * Método responsável por editar as relações do produto com os modelos e fornecedores.
   * 
   * @param idsModels Lista de IDs dos modelos a serem relacionados ao produto.
   * @param idsFornecedores Lista de IDs dos fornecedores a serem relacionados ao produto.
   * @param idProduct ID do produto recém-criado.
   */
  private async updateRelationsProduct(idsModels: number[], idsFornecedores: number[], idProduct: number): Promise<void> {
    
    // Cria a relação Produto <-> Modelos
    await this.productModel.delete(idProduct);
    await Promise.all(idsModels.map(id => this.productModel.createRelation(idProduct, id)));

    // Cria a relação Produto <-> Fornecedores
    await this.productFornecedor.delete(idProduct);
    await Promise.all(idsFornecedores.map(id => this.productFornecedor.createRelation(idProduct, id)));

  }
}