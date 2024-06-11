import { PointPolicy } from 'src/point-policy/entities/point-policy.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchases_point_status')
export class PurchasesPointStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @OneToMany(() => PointPolicy, (pointPolicy) => pointPolicy.Purchases_status)
  policy: PointPolicy[];
}
