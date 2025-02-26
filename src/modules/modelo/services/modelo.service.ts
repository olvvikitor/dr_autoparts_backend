import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Category } from '@prisma/client';
import { CreateModeloDto } from '../dto/create-modelo-dto';

@Injectable()
export class ModeloService{
  constructor (@Inject() private prismaService:PrismaService) {
  }

  async createNewModel(data: CreateModeloDto):Promise<void>{
    const categoryExist = await this.findModelByNome(data.nome)
    if(categoryExist){
      throw new ConflictException('Já existe um modelo com esse nome cadastrado')
    }
    await this.prismaService.model.create({
      data: {
        name: data.nome,
        marca: data.marca,
        ano: data.ano
      }
    })
  }

  async findModelByNome(nome:string):Promise<Category>{
    return await this.prismaService.model.findFirst({
      where: { name: nome}
    })
  }
  async findModelById(id:number):Promise<Category>{
    return await this.prismaService.model.findFirst({
      where: { id: id}
    })
  }

}