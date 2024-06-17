import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserPermissionsService } from 'src/user-permissions/user-permissions.service';
import { UserRole } from './user-role.enum';

export class mockCreateUserDto {
  email: string;
  password: string;
  phonenumber: string;
  birth_day: string;
  name: string;
  zipcode: string;
  address: string;
  agreement: number;
}

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let userRepository: jest.Mocked<Repository<User>>;
  let userPermissionsService: jest.Mocked<UserPermissionsService>;

  beforeAll(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: UserPermissionsService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get(UsersService) as jest.Mocked<UsersService>;
    userRepository = module.get<Repository<User>>(
      getRepositoryToken(User),
    ) as jest.Mocked<Repository<User>>;
    userPermissionsService = module.get(
      UserPermissionsService,
    ) as jest.Mocked<UserPermissionsService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(usersService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userPermissionsService).toBeDefined();
  });

  it('create user', async () => {
    // given
    const mockRequestData: mockCreateUserDto = {
      email: 'test@naver.com',
      password: 'password012A!',
      phonenumber: '01012345678',
      birth_day: '2024-06-13',
      name: '농담곰',
      zipcode: '12345',
      address: '서울특별시 중구 퇴계로 100',
      agreement: 1,
    };
    const request = {
      user: {
        role: UserRole.NON_MEMBER,
      },
    };

    jest.spyOn(usersService, 'signup').mockResolvedValue(undefined);

    // when
    const result = await controller.userCreate(request, mockRequestData);

    // then
    expect(usersService.signup).toHaveBeenCalledWith(
      mockRequestData,
      UserRole.NON_MEMBER,
    );
    expect(result).toEqual({ message: 'User creation successful' });
  });
});
