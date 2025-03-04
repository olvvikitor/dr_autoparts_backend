import { ConflictException, NotFoundException } from '@nestjs/common';

export class NotFoundExceptionHandler extends NotFoundException{
  constructor(args:string, param: any, valor: any){
    super({
      message: `Não existe um(a) ${args} com o ${param} ${valor}`
    })
  }
}