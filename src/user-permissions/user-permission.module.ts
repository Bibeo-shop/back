import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermission } from './entities/user-permission.entity';
import { UserPermissionsService } from './user-permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserPermission])],
  providers: [UserPermissionsService],
  exports: [UserPermissionsService],
})
export class UserPermissionModule {}
