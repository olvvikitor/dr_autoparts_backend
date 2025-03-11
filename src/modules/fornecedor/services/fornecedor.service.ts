import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Category, Fornecedor } from '@prisma/client';
import { CreateFornecedorDto } from '../dto/create-fornecedor-dto';

@Injectable()
export class FornecedorService {
  constructor(@Inject() private prismaService: PrismaService) {}

  async createNewFornecedor(data: CreateFornecedorDto): Promise<void> {
    const categoryExist = await this.findFornecedorByCode(data.nome);
    if (categoryExist) {
      throw new ConflictException(
        'Já existe um fornecedor com esse código cadastrado',
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
    const categoryExist = await this.findFornecedorByCode(data.nome);

    if (categoryExist) {
      throw new ConflictException(
        'Já existe um fornecedor com esse código cadastrado',
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
    return await this.prismaService.fornecedor.findFirst({
      where: { name: code },
    });
  }
  async findFornecedorById(id: number): Promise<Fornecedor> {
    return await this.prismaService.fornecedor.findFirst({
      where: { id: id },
    });
  }
  async findFornecedorByName(name: string): Promise<Fornecedor> {
    return await this.prismaService.fornecedor.findFirst({
      where: { name: name },
    });
  }

  async findFornecedores(): Promise<Array<Fornecedor>> {
    return await this.prismaService.fornecedor.findMany();
  }
  async deleteById(id: number): Promise<void> {
    await this.prismaService.fornecedor.delete({
      where: {
        id: id,
      },
    });
  }
}
