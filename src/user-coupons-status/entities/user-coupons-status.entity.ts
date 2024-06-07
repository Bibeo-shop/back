import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserCoupon } from 'src/user-coupons/entities/user-coupon.entity';

@Entity('user_coupons_status')
export class UserCouponsStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @OneToMany(() => UserCoupon, (userCoupon) => userCoupon.status)
  userCoupons: UserCoupon[];
}
