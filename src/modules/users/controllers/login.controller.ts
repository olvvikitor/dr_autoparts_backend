import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserService } from '../services/create.user.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { LoginUserService } from '../services/login.user.service';
import { log } from 'console';

@Controller('user')
export class LoginController{

  constructor (private moduleRef:ModuleRef) {
    
  }
  @Post('login')
  async createUser(@Body() userData:LoginUserDto) {
    const loginService = this.moduleRef.get(LoginUserService)
    return await loginService.execute(userData)
  }


}