import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { Result } from '@prisma/client/runtime/library';

@Injectable()
export class UserRepository {
  constructor(@Inject() private prismaService: PrismaService) {}

  async findUserById(id: number): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        id
      }
    })
  }
  async updateAccess(id:number, ultimoAcesso: Date):Promise<void>{
    await this.prismaService.user.update({
      where: {
        id
      },
      data:{
        ultimo_acesso:ultimoAcesso
      }
    })
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

}
