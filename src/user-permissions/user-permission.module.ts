import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermission } from './entities/user-permission.entity';
import { UserPermissionService } from './user-permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserPermission])],
  providers: [UserPermissionService],
  exports: [UserPermissionService],
})
export class UserPermissionModule {}
