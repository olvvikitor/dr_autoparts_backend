import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto{
  @ApiProperty()
  cpf:number
  @ApiProperty()
  password: string
}