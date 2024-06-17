import { Cart } from 'src/carts/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_options')
export class ProductOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @OneToMany(() => Cart, (cart) => cart.option)
  carts: Cart[];
}
