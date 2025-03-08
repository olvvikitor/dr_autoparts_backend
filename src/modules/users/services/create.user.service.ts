import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { CreateUserDto } from '../entities/dtos/create-user.dto';
import { UserRepository } from '../infra/repositories/user.repository';


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
    const cpfIsNotUse = await this.userRepository.findByUserByCpf(data.cpf)

    if(!cpfIsNotUse){
      //criando instancia no banco de dados
     await this.userRepository.createNewUser(data)
    }

  }

  //método que recebe uma string e devolve um hash.
  //criptografa a senha recebida do usuário
  private async encriptPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10)
    return hash;
  }

  //método para verificação de email antes do cadastro do usuario
  //caso exista, retorna uma exception
  //caso não exista um email, retorna true, validando aquele email para a criação
  private async verifyCpfExists(cpf: number): Promise<boolean> {
    const exists = await this.userRepository.findByUserByCpf(cpf)
    if (exists) {
       throw new ConflictException('Phone already exists');
    }
    return true
  }

}