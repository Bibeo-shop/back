import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserPoint } from 'src/user-points/entities/user-point.entity';

@Entity('points')
export class Point {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  point: number;

  @OneToMany(() => UserPoint, (userPoint) => userPoint.point)
  userPoints: UserPoint[];
}
