import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { CreateUserDto } from '../entities/dtos/create-user.dto';
import { UserRepository } from '../infra/repositories/user.repository';
import { TipoUsuario } from '../entities/enums/tipo-user.enum';
import { ConflictExceptions } from 'src/shared/errors/ConflicExeption';


@Injectable()
export class CreateUserService {
  constructor(private userRepository:UserRepository) {
  }

  //método para criação de usuáriop
  public async createUser(data: CreateUserDto): Promise<void> {

    //criando criptografia de senha
    const hash = await this.encriptPassword(data.password);
    data.password = hash;
    //verificando a existencia de email
    
    await this.verifyCpfExists(data.cpf)

    await this.userRepository.createNewUser(data)

  }

  //método que recebe uma string e devolve um hash.
  //criptografa a senha recebida do usuário
  private async encriptPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10)
    return hash;
  }

  //método para verificação de email antes do cadastro do usuario
  //caso exista, retorna uma exception
  //caso não exista um cpf, retorna true, validando aquele cpf para a criação
  private async verifyCpfExists(cpf: string): Promise<boolean> {
    const exists = await this.userRepository.findByUserByCpf(cpf)
    if (exists) {
       throw new ConflictExceptions('Usuário', 'CPF', cpf);
    }
    return true
  }

}