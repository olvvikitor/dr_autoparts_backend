import { IsNotEmpty, MinLength, MaxLength, IsEmail, Length } from 'class-validator'

export class CreateUserDto{
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  name: string
  @Length(12)
  phone: string
  @MinLength(5)
  @MaxLength(30)
  password: string
}