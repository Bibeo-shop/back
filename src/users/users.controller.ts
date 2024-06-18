import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRole } from './user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @UseGuards(AuthGuard)
  async userCreate(@Request() request, @Body() createUserDto: CreateUserDto) {
    const userRole: UserRole = request.user.role;

    await this.usersService.signup(createUserDto, userRole);
    return { message: 'User creation successful' };
  }

  @Post('login')
  async userLogin(@Request() req) {
    const request: Pick<CreateUserDto, 'email' | 'password'> = req.body;
    return { token: await this.usersService.login(request) };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
