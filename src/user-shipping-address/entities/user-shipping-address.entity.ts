import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ShippingAddress } from 'src/shipping-address/entities/shipping-address.entity';

@Entity('user_shipping_address')
export class UserShippingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.shippingAddress)
  @JoinColumn({ name: 'users_id' })
  user: User;

  @ManyToOne(
    () => ShippingAddress,
    (shippingAddress) => shippingAddress.userShippingAddress,
  )
  @JoinColumn({ name: 'shipping_address_id' })
  shippingAddress: ShippingAddress;
}
