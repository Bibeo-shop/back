import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-role.enum';
import { UserPermissionsService } from '../user-permissions/user-permissions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userPermissionsService: UserPermissionsService,
  ) {}

  async signup(createUserDto: CreateUserDto, userRole: UserRole) {
    console.log(createUserDto, userRole);
    const { email, password } = createUserDto;
    let userPermission;

    const isUserExist = await this.isEmailExist(email);
    if (isUserExist) {
      throw new BadRequestException('사용할 수 없는 이메일입니다.');
    }
    const hashedPassword = await this.hashPassword(password);

    if (userRole == 'NonMember') {
      const userPermissionInfo = await this.userPermissionsService.findById(1);
      userPermission = userPermissionInfo;
    }

    const user = new User();
    Object.assign(user, createUserDto);
    user.password = hashedPassword;
    user.permission = userPermission;
    console.log(user);

    const result = await this.userRepository.save(user);
    return result;
  }

  async isEmailExist(email: string) {
    try {
      const userEmail = await this.userRepository.findOne({ where: { email } });
      return !!userEmail;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('이메일 조회에 실패했습니다.');
    }
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
