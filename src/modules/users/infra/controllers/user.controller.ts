import { Body, Controller, Post } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateUserService } from '../../services/create.user.service';
import { CreateUserDto } from '../../entities/dtos/create-user.dto';


@Controller('user')
export class UserController{

  constructor (private userServiceRefs:ModuleRef) {
    
  }
  @Post('new')
  async createUser(@Body() userData:CreateUserDto) {
    const createUserService = this.userServiceRefs.get(CreateUserService)
    return await createUserService.createUser(userData)
  }

}