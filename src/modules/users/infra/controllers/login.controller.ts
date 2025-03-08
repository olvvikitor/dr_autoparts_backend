import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { log } from 'console';
import { LoginUserDto } from '../../entities/dtos/login-user.dto';
import { LoginUserService } from '../../services/login.user.service';

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