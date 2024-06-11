import { Cart } from 'src/carts/entities/cart.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart_status')
export class CartStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Cart, (cart) => cart.cart_status)
  carts: Cart[];
}
