import { CategoryStatus } from 'src/category-status/entities/category-status.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Product, (product) => product.categories)
  product: Product[];

  @ManyToOne(() => CategoryStatus, (categoryStatus) => categoryStatus.id)
  @JoinColumn({ name: 'category_status_id' })
  status: CategoryStatus;
}
