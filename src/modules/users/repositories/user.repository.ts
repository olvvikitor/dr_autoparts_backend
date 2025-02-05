import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';


@Injectable()
export class UserRepository{
  constructor (@Inject() private prismaService:PrismaService) {
    
  }

  async findByUserPhone(phone:string):Promise<User | null>{
    return await this.prismaService.user.findFirst({
      where: {
        phone: phone
      }
    })
  }

  async createNewUser(data: Prisma.UserCreateInput):Promise<void>{
    try {
      await this.prismaService.user.create({
        data:data
      })
    } catch (error) {
      console.log(error)
    }
  }
}