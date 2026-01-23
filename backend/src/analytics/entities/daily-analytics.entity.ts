import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('daily_analytics')
@Index(['restaurantId', 'date'])
export class DailyAnalytics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  restaurantId: string;

  @Column('date')
  @Index()
  date: Date;

  @Column('int', { default: 0 })
  totalOrders: number;

  @Column('int', { default: 0 })
  completedOrders: number;

  @Column('int', { default: 0 })
  cancelledOrders: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalRevenue: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  cryptoRevenue: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  xlmVolume: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  usdcVolume: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  averageOrderValue: number;

  @Column('int', { default: 0 })
  uniqueCustomers: number;

  @Column('int', { default: 0 })
  newCustomers: number;

  @Column('bigint', { default: 0 })
  tokensIssued: number;

  @Column('bigint', { default: 0 })
  tokensRedeemed: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
