import { CouponIssuanceMode } from 'src/coupon-issuance-mode/entities/coupon-issuance-mode.entity';
import { CouponStatus } from 'src/coupon-status/entities/coupon-status.entity';
import { UserCoupon } from 'src/user-coupons/entities/user-coupon.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 30 })
  coupon_number: string;

  @Column()
  discount: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp' })
  expiration_date: Date;

  // 사용 가능 최소 금액
  @Column()
  minimum_usage: number;

  @ManyToOne(() => CouponStatus, (couponStatus) => couponStatus.coupons)
  @JoinColumn({ name: 'stauts_id' })
  status: CouponStatus;

  // 발행 조건
  @ManyToOne(
    () => CouponIssuanceMode,
    (couponIssuanceMode) => couponIssuanceMode.id,
  )
  @JoinColumn({ name: 'issuance_mode_id' })
  mode: CouponIssuanceMode;

  @OneToMany(() => UserCoupon, (userCoupon) => userCoupon.coupon)
  coupons: Coupon[];
}
