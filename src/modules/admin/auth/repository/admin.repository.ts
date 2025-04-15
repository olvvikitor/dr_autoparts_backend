import { Inject, Injectable } from '@nestjs/common';
import { Administrator } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';


@Injectable()
export class AdminRepository{
  constructor (private prismaService:PrismaService) {
    
  }
  async findAdminById(id:number):Promise<Administrator>{
    return await  this.prismaService.administrator.findFirst({
      where:{
        id
      }
    })
  }

  async findAdminByLogin(login:string):Promise<Administrator>{
    return await  this.prismaService.administrator.findFirst({
      where:{
        login: login
      }
    })
  }
}