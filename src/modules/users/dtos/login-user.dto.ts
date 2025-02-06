import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto{
  @ApiProperty()
  phone:string
  @ApiProperty()
  password: string
}