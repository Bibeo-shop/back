import { CartStatus } from 'src/cart-status/entities/cart-status.entity';
import { ProductOption } from 'src/product-options/entities/product_option.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => CartStatus, (cartStatus) => cartStatus.id)
  @JoinColumn({ name: 'cart_status_id' })
  cart_status: CartStatus;

  @ManyToOne(() => ProductOption, (productOption) => productOption.id)
  @JoinColumn({ name: 'product_option_id' })
  option: ProductOption;
}
