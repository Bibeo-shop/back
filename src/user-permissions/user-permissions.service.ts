import { Injectable } from '@nestjs/common';
import { UserPermission } from './entities/user-permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserPermissionsService {
  constructor(
    @InjectRepository(UserPermission)
    private readonly userPermissionRepository: Repository<UserPermission>,
  ) {}

  async findById(id: number): Promise<UserPermission> {
    const result = await this.userPermissionRepository.findOne({
      where: { id },
    });
    return result;
  }
}
