import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Category, Model } from '@prisma/client';
import { CreateModeloDto } from '../dto/create-modelo-dto';

@Injectable()
export class ModeloService {
  constructor(@Inject() private prismaService: PrismaService) {}

  async createNewModel(data: CreateModeloDto): Promise<void> {
    const categoryExist = await this.findModelByNome(data.nome);
    if (categoryExist) {
      throw new ConflictException(
        'Já existe um modelo com esse nome cadastrado',
      );
    }
    await this.prismaService.model.create({
      data: {
        name: data.nome,
        marca: data.marca,
        ano: data.ano,
      },
    });
  }

  async findModelByNome(nome: string): Promise<Model> {
    return await this.prismaService.model.findFirst({
      where: { name: nome },
    });
  }

  async findAllModels(): Promise<Array<Model>> {
    return await this.prismaService.model.findMany();
  }


  async findModelById(id: number): Promise<Model> {
    return await this.prismaService.model.findFirst({
      where: { id: id },
    });
  }
  async deleteModel(id: number): Promise<Model> {
    return await this.prismaService.model.delete({
      where: { id: id },
    });
  }

  async updateModel(id: number, data:CreateModeloDto): Promise<Model> {
    return await this.prismaService.model.update({
      where: { id: id },
      data:{...data}
    });
  }
}
