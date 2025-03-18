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
        OR: [{ name: data.nome }, { code: data.code }],
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
        name: data.nome,
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
        OR: [{ name: data.nome }, { code: data.code }],
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
        name: data.nome,
      },
    });
  }

  async findFornecedorByCode(code: string): Promise<Fornecedor> {
    const fornecedor = await this.prismaService.fornecedor.findFirst({
      where: {
        code: code,
      },
    });

    if (!fornecedor) {
      throw new NotFoundExceptionHandler('Fornecedor', 'code', code);
    }
    return fornecedor;
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
  async findFornecedorByName(name: string): Promise<Fornecedor> {
    const fornecedor = await this.prismaService.fornecedor.findFirst({
      where: {
        name: name,
      },
    });

    if (!fornecedor) {
      throw new NotFoundExceptionHandler('Fornecedor', 'name', name);
    }
    return fornecedor;
  }

  async findFornecedores(): Promise<Array<Fornecedor>> {
    return await this.prismaService.fornecedor.findMany();
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
