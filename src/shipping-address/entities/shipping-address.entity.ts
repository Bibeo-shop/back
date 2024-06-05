import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserShippingAddress } from 'src/user-shipping-address/entities/user-shipping-address.entity';

@Entity('shipping_address')
export class ShippingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  phonenumber: string;

  @Column({ length: 12 })
  address_name: string;

  @Column({ length: 12 })
  name: string;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 10 })
  zipcode: string;

  @Column({ type: 'tinyint' })
  is_default: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => UserShippingAddress,
    (userShippingAddress) => userShippingAddress.shippingAddress,
  )
  userShippingAddress: UserShippingAddress[];
}
