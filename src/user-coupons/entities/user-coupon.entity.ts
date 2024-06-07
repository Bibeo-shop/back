import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserCouponsStatus } from 'src/user-coupons-status/entities/user-coupons-status.entity';

@Entity('user_coupons')
export class UserCoupon {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.coupons)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => UserCouponsStatus,
    (userCouponsStatus) => userCouponsStatus.userCoupons,
  )
  @JoinColumn({ name: 'status_id' })
  status: UserCouponsStatus;
}
