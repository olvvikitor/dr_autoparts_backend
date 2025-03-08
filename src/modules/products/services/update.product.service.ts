import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CategoryService } from 'src/modules/category/services/category.service';
import { FornecedorService } from 'src/modules/fornecedor/services/fornecedor.service';
import { ModeloService } from 'src/modules/modelo/services/modelo.service';
import { ProductFornecedorRepository } from 'src/modules/productFornecedor/repositories/productFornecedor.repository';
import { ProductModelRepository } from 'src/modules/productModel/repositories/productModel.repository';
import { NotFoundExceptionHandler } from 'src/shared/errors/NotFoundExpetion';
import { Role } from 'src/modules/users/enums/role.enum';

@Injectable()
export class UpdateProductService {
  constructor(
    @Inject() private productRepository: ProductRepository,
    @Inject() private categoryService: CategoryService,
    @Inject() private fornecedorService: FornecedorService,
    @Inject() private modeloService: ModeloService,
    @Inject() private productModel: ProductModelRepository,
    @Inject() private productFornecedor: ProductFornecedorRepository,
  ) {}

  //O método de editar produto, recebe os parametros informados.
  //ATENÇÃO: PASSAR NO CORPO DA REQUISIÇÃO OS FORNECEDORES E MODELOS QUE JÁ TINHA ANTES
  //POIS QUANDO EDITA UM PRODUTO<O METODO REMOVE TODOS E ADICIONA OS QUE VEM NO CORPO
  async execute(idProduct: number, data: CreateProductDto, role:Role): Promise<void> {

    if(role !== Role.ADMIN){
      throw new ForbiddenException('Usuário com perfil inválido')
    }

    await this.verifyExistsIds(
      data.modelId,
      data.fornecedorId,
      data.categoryId,
      idProduct,
    );

    await this.updateRelationsProduct(
      data.modelId,
      data.fornecedorId,
      idProduct,
    );

    await this.productRepository.update(idProduct, data);

  }
  /**
   * Método responsável por editar as relações do produto com os modelos e fornecedores.
   *
   * @param idsModels Lista de IDs dos modelos a serem relacionados ao produto.
   * @param idsFornecedores Lista de IDs dos fornecedores a serem relacionados ao produto.
   * @param idProduct ID do produto
   */
  private async updateRelationsProduct(
    idsModels: number[],
    idsFornecedores: number[],
    idProduct: number,
  ): Promise<void> {
    // Edita a relação Produto <-> Modelos
    await this.productModel.delete(idProduct);
    await Promise.all(
      idsModels.map((id) => this.productModel.createRelation(idProduct, id)),
    );

    // Edita a relação Produto <-> Fornecedores
    await this.productFornecedor.delete(idProduct);
    await Promise.all(
      idsFornecedores.map((id) =>
        this.productFornecedor.createRelation(idProduct, id),
      ),
    );
  }

  /**
   * Método responsável por verificar se os IDs informados existem no banco de dados.
   *
   * @param idsModels Lista de IDs dos modelos do produto.
   * @param idsFornecedores Lista de IDs dos fornecedores do produto.
   * @param idCategory ID da categoria do produto.
   * @param idProduct ID do produto.
   * @throws NotFoundException Se algum dos IDs não for encontrado.
   */
  private async verifyExistsIds(
    idsModels: number[],
    idsFornecedores: number[],
    idCategory: number,
    idProduct: number,
  ): Promise<void> {
    const product = await this.productRepository.getProductById(idProduct);

    if (!product) {
      throw new NotFoundExceptionHandler('Produto', 'Id', idProduct);
    }

    // Valida a existência da categoria informada
    const category = await this.categoryService.findCategoryById(idCategory);

    if (!category) {
      throw new NotFoundExceptionHandler('Categoria', 'Id', idCategory);
    }

    // Valida a existência dos fornecedores informados
    await Promise.all(
      idsFornecedores.map(async (id) => {
        const fornecedor = await this.fornecedorService.findFornecedorById(id);
        if (!fornecedor) {
          throw new NotFoundExceptionHandler('Fornecedor', 'Id', id);
        }
      }),
    );

    // Valida a existência dos modelos informados
    await Promise.all(
      idsModels.map(async (id) => {
        const model = await this.modeloService.findModelById(id);
        if (!model) {
          throw new NotFoundExceptionHandler('Modelo', 'Id', id);
        }
      }),
    );
  }
}
