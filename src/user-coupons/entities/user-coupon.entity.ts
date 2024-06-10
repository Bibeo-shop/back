import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Coupon } from 'src/coupons/entities/coupon.entity';

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

  @ManyToOne(() => Coupon, (coupon) => coupon.id)
  @JoinColumn({ name: 'coupon_id' })
  coupon: Coupon;
}
