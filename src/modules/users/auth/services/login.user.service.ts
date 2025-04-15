import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';


import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../entities/dtos/login-user.dto';
import { UserRepository } from '../infra/repositories/user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginUserService {
  constructor(
    private userRepository: UserRepository,
    @Inject() private jwtService: JwtService,
    private configService:ConfigService
  ) {}

  public async execute(data: LoginUserDto): Promise<{ token: string }> {

    const user = await this.userRepository.findByUserByCpf(data.cpf);

    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }
    const hashedPassword = user.password as string;

    if (await this.decryptPassword(data.password, hashedPassword)) {
      let ultimo_acesso  = Date.now()
      const acesso = (moment(ultimo_acesso)).toDate()
      await this.userRepository.updateAccess(user.id, acesso)
      
      const payload = { id: user.id, nome: user.name, idEndereco: user.enderecoId, idContato: user.contatoId};
      return {
        token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException('usuario ou senha inválido');
    }
  }

  private async decryptPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const hash = await bcrypt.compare(password, hashPassword);
    return hash;
  }
}
