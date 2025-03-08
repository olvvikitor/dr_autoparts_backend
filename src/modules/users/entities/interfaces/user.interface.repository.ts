import { User } from '@prisma/client';
import { CreateUserDto } from '../dtos/create-user.dto';

export interface IUserRepository{
  createNewUser(data:CreateUserDto):Promise<void>
  findUserById(id:number):Promise<User|any>
  findByUserByCpf(phone:number):Promise<User|any>
}