import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserPermissionsService } from 'src/user-permissions/user-permissions.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
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

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<Repository<User>>;
  let userPermissionService: jest.Mocked<UserPermissionsService>;
  let userPermissionsRepository: jest.Mocked<Repository<UserPermission>>;

  beforeAll(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
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
        {
          provide: getRepositoryToken(UserPermission),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(
      getRepositoryToken(User),
    ) as jest.Mocked<Repository<User>>;
    userPermissionService = module.get(
      UserPermissionsService,
    ) as jest.Mocked<UserPermissionsService>;
    userPermissionsRepository = module.get<Repository<UserPermission>>(
      getRepositoryToken(UserPermission),
    ) as jest.Mocked<Repository<UserPermission>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(userPermissionService).toBeDefined();
    expect(userPermissionsRepository).toBeDefined();
  });

  it('signup', async () => {
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
    const hashedPassword = 'hashedPassword';
    const userPermission: UserPermission = {
      id: 1,
      name: '일반회원',
      users: [],
    };
    const userRole: UserRole = UserRole.NON_MEMBER;

    jest.spyOn(service, 'isEmailExist').mockResolvedValue(false);
    jest.spyOn(service, 'hashPassword').mockResolvedValue(hashedPassword);
    userPermissionService.findById.mockResolvedValue(userPermission);
    userRepository.save.mockResolvedValue({
      ...mockRequestData,
      password: hashedPassword,
      permission: userPermission,
    } as User);

    // when
    jest.spyOn(service, 'signup');
    await service.signup(mockRequestData, userRole);

    // then
    expect(userRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@naver.com',
        password: hashedPassword,
        phonenumber: '01012345678',
        birth_day: '2024-06-13',
        name: '농담곰',
        zipcode: '12345',
        address: '서울특별시 중구 퇴계로 100',
        agreement: 1,
        permission: userPermission,
      }),
    );
  });
});
