import { Inject, Injectable } from '@nestjs/common';
import { Carrousel } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CarrouselRepository{
  constructor (@Inject() private prismaService:PrismaService) {
  }
  async save(urlImages:string[]):Promise<void>{
    await this.prismaService.carrousel.create({
      data:{
        imgUrl: urlImages,
        active:true
      }
    })
  }
  async getActive():Promise<Carrousel>{
    return await this.prismaService.carrousel.findFirst({
      where: {
        active:true
      }
    })
  }
  async updateForDasactivate(id:number):Promise<void>{
    await this.prismaService.carrousel.update({
      where:{
        id: id
      },
      data:{
        active:false
      }
    })
  }
}