import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumberString, MinLength, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ description: 'Estado da localização', example: 'São Paulo' })
  @IsNotEmpty()
  @IsString()
  estado: string;

  @ApiProperty({ description: 'Cidade da localização', example: 'São Paulo' })
  @IsNotEmpty()
  @IsString()
  cidade: string;

  @ApiProperty({ description: 'Bairro da localização', example: 'Centro' })
  @IsNotEmpty()
  @IsString()
  bairro: string;

  @ApiProperty({ description: 'Rua da localização', example: 'Avenida Paulista' })
  @IsNotEmpty()
  @IsString()
  rua: string;

  @ApiProperty({ description: 'Número da residência ou estabelecimento', example: '123' })
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(10)
  numero: string;

  @ApiProperty({ description: 'CEP da localização', example: '01310-000' })
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(8)
  cep: string;
}
