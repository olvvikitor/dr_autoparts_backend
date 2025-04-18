import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Fornecedor } from '@prisma/client';
import { CreateFornecedorDto } from '../dto/create-fornecedor-dto';
import { NotFoundExceptionHandler } from 'src/shared/errors/NotFoundExpetion';

@Injectable()
export class FornecedorService {
  constructor(@Inject() private prismaService: PrismaService) {}

  async createNewFornecedor(data: CreateFornecedorDto): Promise<void> {
    const fornecedorExists = await this.prismaService.fornecedor.findFirst({
      where: {
        OR: [{ name: data.name }, { code: data.code }],
      },
    });

    if (fornecedorExists) {
      throw new ConflictException(
        'Já existe um fornecedor com esse nome ou código cadastrado',
      );
    }

    await this.prismaService.fornecedor.create({
      data: {
        code: data.code,
        name: data.name,
      },
    });
  }
  async update(id: number, data: CreateFornecedorDto): Promise<void> {
    const fornecedor = await this.prismaService.fornecedor.findFirst({
      where: {
        id: id,
      },
    });

    if (!fornecedor) {
      throw new NotFoundExceptionHandler('Fornecedor', 'id', id);
    }

    const fornecedorExists = await this.prismaService.fornecedor.findFirst({
      where: {
        OR: [{ name: data.name }, { code: data.code }],
        AND: { NOT: { id: id } },
      },
    });

    if (fornecedorExists) {
      throw new ConflictException(
        'Já existe existe um fornecedor com esse código ou nome cadastrado',
      );
    }

    await this.prismaService.fornecedor.update({
      where: { id: id },
      data: {
        code: data.code,
        name: data.name,
      },
    });
  }


  async findFornecedorById(id: number): Promise<Fornecedor> {
    const fornecedor = await this.prismaService.fornecedor.findFirst({
      where: {
        id: id,
      },
    });

    if (!fornecedor) {
      throw new NotFoundExceptionHandler('Fornecedor', 'id', id);
    }
    return fornecedor;
  }
  async findFornecedorByNameOrCode(param: string): Promise<Fornecedor> {
    const fornecedor = await this.prismaService.fornecedor.findFirst({
      where: {
        OR:[
          { name: { contains: param, mode: 'insensitive' } },
          { code: { contains: param, mode: 'insensitive' } },
        ]
      },
    });

    if (!fornecedor) {
      throw new NotFoundExceptionHandler('Fornecedor', 'name', param);
    }
    return fornecedor;
  }

  async findFornecedores(): Promise<Array<Fornecedor>> {
    return await this.prismaService.fornecedor.findMany({orderBy:{id:'asc'}});
  }

  
  async deleteById(id: number): Promise<void> {
    const fornecedor = await this.prismaService.fornecedor.findFirst({
      where: {
        id: id,
      },
    });

    if (!fornecedor) {
      throw new NotFoundExceptionHandler('Fornecedor', 'name', name);
    }
    await this.prismaService.fornecedor.delete({
      where: {
        id,
      },
    });
  }
}
