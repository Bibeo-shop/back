import { Coupon } from 'src/coupons/entities/coupon.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coupon_status')
export class CouponStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @OneToMany(() => Coupon, (coupon) => coupon.status)
  coupons: Coupon[];
}
