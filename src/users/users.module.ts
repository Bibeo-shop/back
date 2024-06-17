import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermissionModule } from 'src/user-permissions/user-permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserPermissionModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
