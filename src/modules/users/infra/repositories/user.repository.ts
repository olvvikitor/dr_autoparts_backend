import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IUserRepository } from '../../entities/interfaces/user.interface.repository';
import { CreateUserDto } from '../../entities/dtos/create-user.dto';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { Result } from '@prisma/client/runtime/library';


@Injectable()
export class UserRepository implements IUserRepository{
  constructor (@Inject() private prismaService:PrismaService) {
    
  }

  findUserById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async findByUserByCpf(cpf:number):Promise<Prisma.EmpresaWhereInput | null>{
    return await this.prismaService.empresa.findFirst({
      where: {
        cpf,
    },include:{user:true}})
  }

  async createNewUser(data: CreateUserDto):Promise<void>{

      await this.prismaService.user.create({
        data:{
          name: data.name,
          password: data.password,
        }
      })

  }
}