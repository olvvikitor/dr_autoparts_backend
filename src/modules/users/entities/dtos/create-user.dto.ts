import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome completo do usuário', minLength: 8, maxLength: 40 })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  @IsString()
  name: string;

  @ApiProperty({ description: 'Razão social da empresa' })
  @IsNotEmpty()
  @IsString()
  razão_social: string;

  @ApiProperty({ description: 'Nome fantasia da empresa', required: false })
  @IsOptional()
  @IsString()
  nome_fantasia?: string | null;

  @ApiProperty({ description: 'Atividade principal da empresa', required: false })
  @IsOptional()
  @IsString()
  atividade?: string | null;

  @ApiProperty({ description: 'Número do CNPJ', required: false, type: Number })
  @IsOptional()
  @IsNumber()
  cnpj?: number | null;

  @ApiProperty({ description: 'Número do CPF' })
  @IsNotEmpty()
  @IsNumber()
  cpf: number;

  @ApiProperty({ description: 'Data de abertura da empresa', required: false, type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString()
  data_de_abertura?: Date | string | null;

  @ApiProperty({ description: 'Natureza jurídica da empresa', required: false })
  @IsOptional()
  @IsString()
  natureza_juridica?: string | null;

  @ApiProperty({ description: 'CNAEs utilizados pela empresa', required: false })
  @IsOptional()
  @IsString()
  cnaes_utilizados?: string | null;

  @ApiProperty({ description: 'Senha do usuário', minLength: 5, maxLength: 30 })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  @IsString()
  password: string;
}
