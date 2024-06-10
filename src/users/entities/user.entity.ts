import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import { UserCoupon } from 'src/user-coupons/entities/user-coupon.entity';
import { UserPoint } from 'src/user-points/entities/user-point.entity';
import { UserShippingAddress } from 'src/user-shipping-address/entities/user-shipping-address.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 20 })
  phonenumber: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 10 })
  zipcode: string;

  @Column({ length: 50 })
  address: string;

  @Column({ type: 'tinyint' })
  agreement: number;

  @Column({ length: 20 })
  birth_day: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserPermission, (userPermission) => userPermission.users)
  @JoinColumn({ name: 'permissions_id' })
  permission: UserPermission;

  @OneToMany(() => UserCoupon, (userCoupon) => userCoupon.user)
  coupons: UserCoupon[];

  @OneToMany(() => UserPoint, (userPoint) => userPoint.user)
  points: UserPoint[];

  @OneToMany(
    () => UserShippingAddress,
    (UserShippingAddress) => UserShippingAddress.user,
  )
  shippingAddress: UserShippingAddress[];
}
