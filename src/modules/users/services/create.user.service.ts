import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';


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
    const emailIsNotUse = await this.verifyPhoneExists(data.phone)
    if(emailIsNotUse){
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
  private async verifyPhoneExists(phone: string): Promise<boolean> {
    const exists = await this.userRepository.findByUserPhone(phone)
    if (exists) {
       throw new ConflictException('Phone already exists');
    }
    return true
  }

}