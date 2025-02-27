import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CategoryService } from 'src/modules/category/services/category.service';
import { FornecedorService } from 'src/modules/fornecedor/services/fornecedor.service';
import { ModeloService } from 'src/modules/modelo/services/modelo.service';
import { ProductModelRepository } from 'src/modules/productModel/repositories/productModel.repository';
import { ProductFornecedorRepository } from 'src/modules/productFornecedor/repositories/productFornecedor.repository';

@Injectable()
export class CreateProductService{

  constructor (@Inject() private productRepository : ProductRepository,
  @Inject() private categoryService:CategoryService,
  @Inject() private fornecedorService:FornecedorService,
  @Inject() private modeloService:ModeloService,
  @Inject() private productModel: ProductModelRepository,
  @Inject() private productFornecedor: ProductFornecedorRepository
) {
  }
  async createNewProduct(data: CreateProductDto): Promise<void> {

    //Verifica a existrencia desses ids, caso n exista algum, ele lança uma exceção e não salva o produto    
    await this.verifyExistsIds(data.modelId, data.fornecedorId, data.categoryId)
    
  
    // Cria o produto
    const product = await this.productRepository.createNewProduct(data);


    //cria relacionamento N:N
    await this.createRelationsProduct(data.modelId, data.fornecedorId, product.id)

  }
  private async verifyExistsIds(idsModels: number[], idsFornecedores: number[], idCategory: number): Promise<void> {
    // Valida categoria
    const category = await this.categoryService.findCategoryById(idCategory);
    if (!category) {
      throw new NotFoundException(`Categoria com ID ${idCategory} não encontrada.`);
    }
  
    // Valida fornecedores
    const fornecedores = await Promise.all(
      idsFornecedores.map(async id => {
        const fornecedor = await this.fornecedorService.findFornecedorById(id);
        if (!fornecedor) throw new NotFoundException(`Fornecedor com ID ${id} não encontrado.`);
      })
    );
  
    // Valida modelos
    const modelos = await Promise.all(
      idsModels.map(async id => {
        const model = await this.modeloService.findModelById(id);
        if (!model) throw new NotFoundException(`Modelo com ID ${id} não encontrado.`);
      })
    );
  }
  private async createRelationsProduct(idsModels: number[], idsFornecedores: number[], idProduct:number):Promise<void>{
        // Cria as relações de Produto <-> Model
        await Promise.all(idsModels.map(id => this.productModel.createRelation(idProduct, id)));
        // Cria as relações de Produto <-> Fornecedor
        await Promise.all(idsFornecedores.map(id => this.productFornecedor.createRelation(idProduct, id)));
  }
}