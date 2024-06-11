import { PointPolicy } from 'src/point-policy/entities/point-policy.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('expiration_date_status')
export class ExpirationDateStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @OneToMany(() => PointPolicy, (pointPolicy) => pointPolicy.expiration_status)
  policy: PointPolicy[];
}
