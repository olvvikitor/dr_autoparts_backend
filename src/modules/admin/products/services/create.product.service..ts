import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CategoryService } from '../../category/services/category.service';
import { FornecedorService } from '../../fornecedor/services/fornecedor.service';
import { ModeloService } from '../../modelo/services/modelo.service';


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
  ) {}

  /**
   * Método responsável por criar um novo produto no banco de dados.
   * 
   * @param data Dados do produto recebidos via DTO.
   * @throws NotFoundException Se algum dos IDs fornecidos (categoria, fornecedor ou modelo) não existir.
   * @throws ForbiddenException Se o usuario que estiver tentando cadastrar não for do tipo ADMIN
   */
  async createNewProduct(data: CreateProductDto): Promise<void> {


    
    // Verifica se os IDs de modelo, fornecedor e categoria existem
    await this.verifyExistsIds(data.modelId, data.fornecedorId, data.categoryId);

    // Cria o produto no banco de dados
    await this.productRepository.createNewProduct(data);

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


}
