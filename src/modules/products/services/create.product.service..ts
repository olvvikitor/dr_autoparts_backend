import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CategoryService } from 'src/modules/category/services/category.service';
import { FornecedorService } from 'src/modules/fornecedor/services/fornecedor.service';
import { ModeloService } from 'src/modules/modelo/services/modelo.service';
import { ProductModelRepository } from 'src/modules/productModel/repositories/productModel.repository';
import { ProductFornecedorRepository } from 'src/modules/productFornecedor/repositories/productFornecedor.repository';
import { Role } from 'src/modules/users/enums/role.enum';

/**
 * Serviço responsável pela criação de novos produtos.
 */
@Injectable()
export class CreateProductService {

  /**
   * Construtor da classe que injeta os serviços e repositórios necessários.
   * 
   * @param productRepository Repositório responsável pela manipulação dos produtos no banco de dados.
   * @param categoryService Serviço responsável pela validação das categorias dos produtos.
   * @param fornecedorService Serviço responsável pela validação dos fornecedores.
   * @param modeloService Serviço responsável pela validação dos modelos.
   * @param productModel Repositório responsável pela relação entre produtos e modelos.
   * @param productFornecedor Repositório responsável pela relação entre produtos e fornecedores.
   */
  constructor(
    @Inject() private productRepository: ProductRepository,
    @Inject() private categoryService: CategoryService,
    @Inject() private fornecedorService: FornecedorService,
    @Inject() private modeloService: ModeloService,
    @Inject() private productModel: ProductModelRepository,
    @Inject() private productFornecedor: ProductFornecedorRepository
  ) {}

  /**
   * Método responsável por criar um novo produto no banco de dados.
   * 
   * @param data Dados do produto recebidos via DTO.
   * @throws NotFoundException Se algum dos IDs fornecidos (categoria, fornecedor ou modelo) não existir.
   * @throws ForbiddenException Se o usuario que estiver tentando cadastrar não for do tipo ADMIN
   */
  async createNewProduct(data: CreateProductDto, role: Role): Promise<void> {


    if(role !== Role.ADMIN){
      throw new ForbiddenException('Usuário com perfil inválido')
    }
    
    // Verifica se os IDs de modelo, fornecedor e categoria existem
    await this.verifyExistsIds(data.modelId, data.fornecedorId, data.categoryId);

    // Cria o produto no banco de dados
    const product = await this.productRepository.createNewProduct(data);

    // Cria as relações entre o produto e os modelos/fornecedores
    // await this.createRelationsProduct(data.modelId, data.fornecedorId, product.id);

  }

  /**
   * Método responsável por verificar se os IDs informados existem no banco de dados.
   * 
   * @param idsModels Lista de IDs dos modelos do produto.
   * @param idsFornecedores Lista de IDs dos fornecedores do produto.
   * @param idCategory ID da categoria do produto.
   * @throws NotFoundException Se algum dos IDs não for encontrado.
   */
  private async verifyExistsIds(idsModels: number[], idsFornecedores: number[], idCategory: number): Promise<void> {
    
    // Valida a existência da categoria informada
    const category = await this.categoryService.findCategoryById(idCategory);
    if (!category) {
      throw new NotFoundException(`Categoria com ID ${idCategory} não encontrada.`);
    }

    // Valida a existência dos fornecedores informados
    await Promise.all(
      idsFornecedores.map(async id => {
        const fornecedor = await this.fornecedorService.findFornecedorById(id);
        if (!fornecedor){
          throw new NotFoundException(`Fornecedor com ID ${id} não encontrado.`);
        } 
      })
    );

    // Valida a existência dos modelos informados
    await Promise.all(
      idsModels.map(async id => {
        const model = await this.modeloService.findModelById(id);
        if (!model) {
          throw new NotFoundException(`Modelo com ID ${id} não encontrado.`);
        }
      })
    );
  }

  /**
   * Método responsável por criar as relações do produto com os modelos e fornecedores.
   * 
   * @param idsModels Lista de IDs dos modelos a serem relacionados ao produto.
   * @param idsFornecedores Lista de IDs dos fornecedores a serem relacionados ao produto.
   * @param idProduct ID do produto recém-criado.
   */
  // private async createRelationsProduct(idsModels: number[], idsFornecedores: number[], idProduct: number): Promise<void> {
    
  //   // Cria a relação Produto <-> Modelos
  //   await Promise.all(idsModels.map(id => this.productModel.createRelation(idProduct, id)));

  //   // Cria a relação Produto <-> Fornecedores
  //   await Promise.all(idsFornecedores.map(id => this.productFornecedor.createRelation(idProduct, id)));
  // }
}
