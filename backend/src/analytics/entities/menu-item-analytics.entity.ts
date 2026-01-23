import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm';

@Entity('menu_item_analytics')
@Index(['menuItemId', 'date'])
export class MenuItemAnalytics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  menuItemId: string;

  @Column('date')
  @Index()
  date: Date;

  @Column('int', { default: 0 })
  orderCount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  revenue: number;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column('int', { default: 0 })
  viewCount: number;

  @Column('int', { default: 0 })
  addToCartCount: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  conversionRate: number;

  @CreateDateColumn()
  createdAt: Date;
}
