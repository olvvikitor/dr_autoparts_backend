import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEmail, Matches } from 'class-validator';

export class CreateContatoDto {
  @ApiProperty({ description: 'Número de telefone do usuário ou empresa' , example:"075983633860"})
  @IsNotEmpty()
  @IsString()
  telefone: string;

  @ApiProperty({ description: 'Email do usuário ou empresa', required: false, example:'email@gmail.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  email: string | null;
}
