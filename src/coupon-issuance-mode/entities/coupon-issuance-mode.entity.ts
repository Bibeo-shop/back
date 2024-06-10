import { Coupon } from 'src/coupons/entities/coupon.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coupon_issuance_mode')
export class CouponIssuanceMode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @OneToMany(() => Coupon, (coupon) => coupon.mode)
  coupons: Coupon[];
}
