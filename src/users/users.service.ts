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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const isUserExist = await this.isEmailExist(email);
    console.log('isUserExist', isUserExist);
    if (isUserExist) {
      throw new BadRequestException('사용할 수 없는 이메일입니다.');
    }
    const hashedPassword = await this.hashPassword(password);
    const newUserDto = {
      ...createUserDto,
      password: hashedPassword,
    };
    const newUser = await this.userRepository.create(newUserDto);
    return await this.userRepository.save(newUser);
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
