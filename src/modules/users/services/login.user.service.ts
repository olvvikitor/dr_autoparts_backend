import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import { LoginUserDto } from '../dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class LoginUserService {
  constructor(private userRepository: UserRepository,
    @Inject() private jwtService: JwtService

  ) {
  }

  public async execute(data: LoginUserDto): Promise<{ token: string }> {

    const user = await this.userRepository.findByUserPhone(data.phone);
    if (!user) {
      throw new NotFoundException('Usuario não encontrado')
    }
    const hashedPassword = user.password

    if (await this.decryptPassword(data.password, hashedPassword)) {
      const payload = { phone: user.phone, id: user.id, nome: user.name, role: user.role }
      return {
        token: await this.jwtService.signAsync(payload)
      }
    }
    else {
      throw new UnauthorizedException('usuario ou senha inválido')
    }

  }

  private async decryptPassword(password: string, hashPassword: string): Promise<boolean> {
    const hash = await bcrypt.compare(password, hashPassword)
    return hash;
  }

}