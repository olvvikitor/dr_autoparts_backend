import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CategoryService } from 'src/modules/category/services/category.service';
import { FornecedorService } from 'src/modules/fornecedor/services/fornecedor.service';
import { ModeloService } from 'src/modules/modelo/services/modelo.service';
import { NotFoundExceptionHandler } from 'src/shared/errors/NotFoundExpetion';
import { IStorageProvider } from 'src/shared/providers/storages/IStorageProvider';
import { ResponseProductDto } from '../dtos/response-product.dto';
import { ProductMapper } from '../mappers/product.mapper';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class UpdateProductService {
  constructor(
    @Inject() private productRepository: ProductRepository,
    @Inject() private categoryService: CategoryService,
    @Inject() private fornecedorService: FornecedorService,
    @Inject() private modeloService: ModeloService,
    @Inject('IStorageProvider') private storageProvider:IStorageProvider
  ) {}

  //O método de editar produto, recebe os parametros informados.
  //ATENÇÃO: PASSAR NO CORPO DA REQUISIÇÃO OS FORNECEDORES E MODELOS QUE JÁ TINHA ANTES
  //POIS QUANDO EDITA UM PRODUTO<O METODO REMOVE TODOS E ADICIONA OS QUE VEM NO CORPO
  async execute(idProduct: number, data: UpdateProductDto): Promise<void> {

    const product = await this.verifyExistsIds(
      data.modelId,
      data.fornecedorId,
      data.categoryId,
      idProduct,
    );

    if(data.image){
      await this.storageProvider.delete(product.imgUrl)
      
      await this.productRepository.update(idProduct, data);
    }
    await this.productRepository.update(idProduct, data);

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
  ): Promise<ResponseProductDto> {

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
    return new ProductMapper().parseToDto(product)
  }
}
