import { ApiBody, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsString,
  IsEnum,
  IsNumberString,
  IsInt,
  IsObject,
} from 'class-validator';
import { TipoUsuario } from '../enums/tipo-user.enum';
import { Address, Contato } from '@prisma/client';
import { CreateAddressDto } from './create-address-dto';
import { CreateContatoDto } from './create-contato.dto';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome completo do usuário', minLength: 8, maxLength: 40, example:"Joao victor" })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tipo de usuário (PESSOA_FISICA ou EMPRESA)', example:TipoUsuario.PESSOA_FISICA })
  @IsNotEmpty()
  @IsEnum(TipoUsuario)
  tipo: TipoUsuario;

  @ApiProperty({ description: 'CPF do usuário ', required: true, example:"00000011133"})
  @IsNumberString()
  @MinLength(11)
  @MaxLength(11)
  cpf: string;

  @ApiProperty({ description: 'CNPJ da empresa (somente se for EMPRESA)', required: false, example:"00000111000066" })
  @IsOptional()
  @IsNumberString()
  @MinLength(14)
  @MaxLength(14)
  cnpj?: string;

  @ApiProperty({ description: 'Endereço do usuário ou empresa', required: false })
  @IsOptional()
  @IsObject()
  @ApiProperty({type: CreateAddressDto})
  endereco?: Address;

  @ApiProperty({ description: 'Contato do usuário ou empresa', required: false })
  @IsOptional()
  @IsObject()
  @ApiProperty({type:CreateContatoDto})
  contato?: Contato;

  @ApiProperty({ description: 'Senha do usuário', minLength: 5, maxLength: 30 ,example:"senha123456"})
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  @IsString()
  password: string;
}
