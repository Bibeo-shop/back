import { Test, TestingModule } from '@nestjs/testing';
import { UserPermissionsService } from './user-permissions.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserPermission } from './entities/user-permission.entity';

describe('UserPermissionsService', () => {
  let service: UserPermissionsService;
  let userPermissionsRepository: jest.Mocked<Repository<UserPermission>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPermissionsService,
        {
          provide: getRepositoryToken(UserPermission),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserPermissionsService>(UserPermissionsService);
    userPermissionsRepository = module.get<Repository<UserPermission>>(
      getRepositoryToken(UserPermission),
    ) as jest.Mocked<Repository<UserPermission>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userPermissionsRepository).toBeDefined();
  });

  it('findById', async () => {
    // given
    const id = 1;

    // when
    await service.findById(id);

    // then
    expect(userPermissionsRepository.findOne).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: 1,
        },
      }),
    );
  });
});
