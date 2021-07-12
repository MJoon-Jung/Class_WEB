import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { RegisterationData } from 'src/dto/register.request.dto';
import { LoginRequestDto } from 'src/dto/login.request.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(): Promise<Users[]> {
    return this.userService.getAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
  @Get('id')
  async getOneById(@Query('id') id: number): Promise<Users> {
    return this.userService.getOneById(id);
  }
  @Get('name')
  async getOneByName(@Query('name') name: string): Promise<Users> {
    return this.userService.findOne(name);
  }

  @Post('register')
  async createUser(@Body() loginRequestDto: LoginRequestDto): Promise<Users> {
    return this.userService.create(loginRequestDto);
  }

  @Patch('update')
  async updatePassword(
    @Body() registerationData: RegisterationData,
  ): Promise<Users> {
    return this.userService.updatePassword(registerationData);
  }
  @Delete('delete')
  async deleteUser(@Body() id: number): Promise<Users> {
    return this.userService.deleteUser(id);
  }
}
