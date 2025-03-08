import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IUserRepository } from '../../entities/interfaces/user.interface.repository';
import { CreateUserDto } from '../../entities/dtos/create-user.dto';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { Result } from '@prisma/client/runtime/library';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject() private prismaService: PrismaService) {}

  findUserById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async findByUserByCpf(cpf: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({
      where: {
        cpf,
      },
      include: {
        contato: true,
        endereco: true,
        carts: true,
        orders: true,
      },
    });
  }

  async createNewUser(data: CreateUserDto): Promise<void> {
    await this.prismaService.user.create({
      data: {
        name: data.name,
        password: data.password,
        tipo: data.tipo,
        cpf: data.cpf,
        cnpj: data.cnpj,
        contato: {
          create: {
            telefone: data.contato.telefone,
            email: data.contato.email,
          },
        },
        endereco: {
          create: {
            bairro: data.endereco.bairro,
            cep: data.endereco.cep,
            cidade: data.endereco.cidade,
            estado: data.endereco.estado,
            numero: data.endereco.numero,
            rua: data.endereco.rua,
          },
        },
      },
    });
  }
}
