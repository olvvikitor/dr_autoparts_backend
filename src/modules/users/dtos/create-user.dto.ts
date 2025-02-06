import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MinLength, MaxLength, IsEmail, Length } from 'class-validator'

export class CreateUserDto{
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  name: string


  @ApiProperty()
  @Length(12)
  phone: string

  @ApiProperty()
  @MinLength(5)
  @MaxLength(30)
  password: string
  
}