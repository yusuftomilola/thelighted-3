import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MenuItemAnalytics } from '../entities/menu-item-analytics.entity';
import { subDays } from 'date-fns';

@Injectable()
export class MenuAnalyticsService {
  constructor(
    @InjectRepository(MenuItemAnalytics)
    private menuAnalyticsRepo: Repository<MenuItemAnalytics>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getTopPerformingItems(restaurantId: string, limit: number = 10) {
    const cacheKey = `top-items:${restaurantId}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const thirtyDaysAgo = subDays(new Date(), 30);

    const topByOrders = await this.menuAnalyticsRepo
      .createQueryBuilder('mia')
      .select('mia.menuItemId', 'menuItemId')
      .addSelect('SUM(mia.orderCount)', 'totalOrders')
      .addSelect('SUM(mia.revenue)', 'totalRevenue')
      .addSelect('AVG(mia.averageRating)', 'avgRating')
      .where('mia.date >= :date', { date: thirtyDaysAgo })
      .groupBy('mia.menuItemId')
      .orderBy('totalOrders', 'DESC')
      .limit(limit)
      .getRawMany();

    await this.cacheManager.set(cacheKey, topByOrders, 900000); // 15 min
    return topByOrders;
  }

  async getUnderperformingItems(restaurantId: string) {
    const thirtyDaysAgo = subDays(new Date(), 30);

    return this.menuAnalyticsRepo
      .createQueryBuilder('mia')
      .select('mia.menuItemId', 'menuItemId')
      .addSelect('SUM(mia.orderCount)', 'totalOrders')
      .addSelect('AVG(mia.averageRating)', 'avgRating')
      .addSelect('AVG(mia.conversionRate)', 'avgConversion')
      .where('mia.date >= :date', { date: thirtyDaysAgo })
      .groupBy('mia.menuItemId')
      .having('SUM(mia.orderCount) < :minOrders', { minOrders: 5 })
      .orHaving('AVG(mia.averageRating) < :minRating', { minRating: 3.0 })
      .getRawMany();
  }

  async getTrendingItems(restaurantId: string) {
    const thisWeek = subDays(new Date(), 7);
    const lastWeek = subDays(new Date(), 14);

    const thisWeekData = await this.menuAnalyticsRepo
      .createQueryBuilder('mia')
      .select('mia.menuItemId', 'menuItemId')
      .addSelect('SUM(mia.orderCount)', 'orders')
      .where('mia.date >= :start', { start: thisWeek })
      .groupBy('mia.menuItemId')
      .getRawMany();

    const lastWeekData = await this.menuAnalyticsRepo
      .createQueryBuilder('mia')
      .select('mia.menuItemId', 'menuItemId')
      .addSelect('SUM(mia.orderCount)', 'orders')
      .where('mia.date BETWEEN :start AND :end', { 
        start: lastWeek, 
        end: thisWeek 
      })
      .groupBy('mia.menuItemId')
      .getRawMany();

    const trending = thisWeekData
      .map(current => {
        const previous = lastWeekData.find(p => p.menuItemId === current.menuItemId);
        const previousOrders = previous?.orders || 0;
        const growth = previousOrders > 0 
          ? ((current.orders - previousOrders) / previousOrders) * 100 
          : 0;
        
        return {
          menuItemId: current.menuItemId,
          currentOrders: current.orders,
          previousOrders,
          growth: parseFloat(growth.toFixed(2)),
        };
      })
      .filter(item => item.growth > 50)
      .sort((a, b) => b.growth - a.growth);

    return trending;
  }
}
