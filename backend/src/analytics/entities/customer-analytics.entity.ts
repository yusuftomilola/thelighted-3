import { Entity, Column, PrimaryGeneratedColumn, Index, UpdateDateColumn } from 'typeorm';

export enum PreferredOrderType {
  DELIVERY = 'delivery',
  PICKUP = 'pickup',
  DINE_IN = 'dine_in',
}

@Entity('customer_analytics')
@Index(['userId', 'restaurantId'])
export class CustomerAnalytics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  restaurantId: string;

  @Column('date')
  firstOrderDate: Date;

  @Column('date')
  lastOrderDate: Date;

  @Column('int', { default: 0 })
  totalOrders: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalSpent: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  averageOrderValue: number;

  @Column('bigint', { default: 0 })
  loyaltyTokenBalance: number;

  @Column('jsonb', { nullable: true })
  favoriteItems: string[];

  @Column({
    type: 'enum',
    enum: PreferredOrderType,
    nullable: true,
  })
  preferredOrderType: PreferredOrderType;

  @UpdateDateColumn()
  updatedAt: Date;
}
