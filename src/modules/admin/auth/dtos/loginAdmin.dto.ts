import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginAdminDto{

  @ApiProperty({description:'login do administrador'})
  @IsString()
  @IsNotEmpty()
  login:string
  @ApiProperty({description:'senha do administrador'})
  @IsString()
  @IsNotEmpty()
  password: string
}