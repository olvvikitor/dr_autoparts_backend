import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  ParseFilePipeBuilder,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CarrouselService } from '../service/create-carrousel.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Carrousel')
@Controller('carrousel')
export class CarrouselController {
  constructor(@Inject() private createCarrousel: CarrouselService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo carrossel com até 4 imagens' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Carrossel criado com sucesso.' })
  @ApiResponse({ status: 422, description: 'Arquivo inválido. Apenas imagens PNG são aceitas.' })
  @UseInterceptors(FilesInterceptor('images', 4, { storage: memoryStorage() }))
  async createNew(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    images: Express.Multer.File[],
  ): Promise<void> {
    await this.createCarrousel.create(images);
  }

  @Get()
  @ApiOperation({ summary: 'Lista as imagens do carrossel' })
  @ApiResponse({ status: 200, description: 'Lista de imagens retornada com sucesso.' })
  async getCarrousel(): Promise<any> {
    return await this.createCarrousel.get();
  }
}
