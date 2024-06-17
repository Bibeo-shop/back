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

  findById(id: number): Promise<UserPermission> {
    return this.userPermissionRepository.findOne({ where: { id } });
  }
}
