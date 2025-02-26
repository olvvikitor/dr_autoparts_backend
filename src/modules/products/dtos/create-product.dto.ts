import { IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  code: string

  @IsNumber()
  price: number;

  @IsNumber()
  priceoast: number; 

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) // Valida cada item do array
  modelId: number[];

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) // Valida cada item do array
  fornecedorId: number[]; 

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
