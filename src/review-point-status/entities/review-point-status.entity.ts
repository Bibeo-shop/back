import { PointPolicy } from 'src/point-policy/entities/point-policy.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('review_point_stauts')
export class ReviewPointStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @OneToMany(() => PointPolicy, (pointPolicy) => pointPolicy.Review_status)
  policy: PointPolicy[];
}
