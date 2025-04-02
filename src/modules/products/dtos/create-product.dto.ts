import { IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty, IsOptional, IsString } from 'class-validator';
import { TipoUnidade } from '../enums/tipoUnidade';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsFile } from 'nestjs-form-data';
import { UploadedFile, UploadedFiles } from '@nestjs/common';

export class CreateProductDto {
  
  @ApiProperty({
    description:'Nome do produto',
    example:'Caixa de marcha',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description:'Descrição do produto',
    example:'A melhor caixa de marcha que existe',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description:'Código do produto',
    example:'D105065',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  code: string

  @ApiProperty({
    description:'Tipo de produto',
    example:TipoUnidade.JOGO,
    enum:TipoUnidade,
    required:true
  })
  tipo: TipoUnidade
  

  @ApiProperty({
    description: 'Preço do produto',
    example: 69.27,
    required:false,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Preço de custo',
    example: 69.27,
    required:false,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  priceoast: number; 


  @ApiProperty({
    description: 'Id da categoria',
    example: 1,
    required:false,
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: `Ids de modelos que em que o produto 'funciona'`,
    example: [1,5,45],
    required:true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) // Valida cada item do array
  @Transform(({ value }) => value.map((id: string) => parseInt(id, 10)))
  modelId: number[];


  @ApiProperty({
    description: `Ids de fornecedores  do produto`,
    example: [3,7,5],
    required:true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) // Valida cada item do array
  @Type(() => Number)
  @Transform(({ value }) => value.map((id: string) => parseInt(id, 10)))
  fornecedorId: number[]; 

  @ApiProperty({
    description: `Caminho da imagem`,
    required:false,
    type:'string',
    format:'binary', 
    })
  @IsOptional()
  @IsString()
  image?: Express.Multer.File;
}