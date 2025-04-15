import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../infra/repositories/user.repository';
import { ConflictExceptions } from 'src/shared/errors/ConflicExeption';
import { CreateUserDto } from '../entities/dtos/create-user.dto';


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
    
    await this.verifyCpfOrCnpjExists(data.cpf, data.cnpj)

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
  private async verifyCpfOrCnpjExists(cpf: string, cnpj:string): Promise<boolean> {
    const exists = await this.userRepository.findByUserByCpf(cpf)
    if (exists) {
       throw new ConflictExceptions('Usuário', 'CPF', cpf);
    }
    const exists2 = await this.userRepository.findByUserByCnpj(cnpj)
    if (exists2) {
       throw new ConflictExceptions('Usuário', 'CNPJ', cnpj);
    }
    return true
  }

}