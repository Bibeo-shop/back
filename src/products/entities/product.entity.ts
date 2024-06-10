import { Category } from 'src/categories/entities/category.entity';
import { ProductOption } from 'src/product_options/entities/product_option.entity';
import { ProductStatus } from 'src/product_status/entities/product_status.entity';
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

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 255 })
  product_image_url: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  price: number;

  @Column()
  retail_price: number;

  @Column()
  shipping_fee: number;

  @Column({ length: 20 })
  shipping_details: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.product)
  @JoinColumn({ name: 'categories_id' })
  categories: Category;

  @ManyToOne(() => ProductStatus, (productStatus) => productStatus.product)
  @JoinColumn({ name: 'status_id' })
  status: ProductStatus;

  @OneToMany(() => ProductOption, (productOption) => productOption.product)
  options: ProductOption[];
}
