import { ExpirationDateStatus } from 'src/expiration-date-status/entities/expiration-date-status.entity';
import { PurchasesPointStatus } from 'src/purchases-point-status/entities/purchases-point-status.entity';
import { ReviewPointStatus } from 'src/review-point-status/entities/review-point-status.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('point_policy')
export class PointPolicy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commission_rate: number;

  @Column()
  base_point: number;

  @Column()
  photo_bonus_point: number;

  @Column({ type: 'timestamp' })
  expiration_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(
    () => PurchasesPointStatus,
    (purchasesPointStatus) => purchasesPointStatus.id,
  )
  @JoinColumn({ name: 'purchases_point_status_id' })
  Purchases_status: PurchasesPointStatus;

  @ManyToOne(
    () => ReviewPointStatus,
    (reviewPointStatus) => reviewPointStatus.id,
  )
  @JoinColumn({ name: 'review_point_status_id' })
  Review_status: ReviewPointStatus;

  @ManyToOne(
    () => ExpirationDateStatus,
    (expirationDateStatus) => expirationDateStatus.id,
  )
  @JoinColumn({ name: 'expiration_date_status_id' })
  expiration_status: ExpirationDateStatus;
}
