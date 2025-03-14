import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dtos/loginAdmin.dto';

@Controller('admin')
export class AdminController{
  constructor (private adminService: AdminService) {
  }
  @Post('auth')
  async login(@Body() loginDto:LoginAdminDto){
    return await this.adminService.login(loginDto)
  }
}