import { ConflictException } from '@nestjs/common';

export class ConflictExceptions extends ConflictException{
  constructor(args:string, param: any, valor: any){
    super({
      message: `Conflito: Já existe um(a) ${args} com o ${param} ${valor}`
    })
  }
}