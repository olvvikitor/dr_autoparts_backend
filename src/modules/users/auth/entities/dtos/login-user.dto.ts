import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto{
  @ApiProperty()
  cpf:string
  @ApiProperty()
  password: string
}