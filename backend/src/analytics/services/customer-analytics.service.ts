import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { CustomerAnalytics } from '../entities/customer-analytics.entity';
import { subDays } from 'date-fns';

@Injectable()
export class CustomerAnalyticsService {
  constructor(
    @InjectRepository(CustomerAnalytics)
    private customerAnalyticsRepo: Repository<CustomerAnalytics>,
  ) {}

  async getCustomerInsights(restaurantId: string) {
    const total = await this.customerAnalyticsRepo.count({ 
      where: { restaurantId } 
    });

    const returning = await this.customerAnalyticsRepo.count({
      where: { 
        restaurantId,
        totalOrders: LessThan(1),
      },
    });

    const lifetimeValue = await this.customerAnalyticsRepo
      .createQueryBuilder('ca')
      .select('AVG(ca.totalSpent)', 'avgLifetimeValue')
      .where('ca.restaurantId = :restaurantId', { restaurantId })
      .getRawOne();

    return {
      totalCustomers: total,
      newCustomers: total - returning,
      returningCustomers: returning,
      repeatCustomerRate: total > 0 ? (returning / total) * 100 : 0,
      averageLifetimeValue: parseFloat(lifetimeValue.avgLifetimeValue || 0),
    };
  }

  async getRetentionMetrics(restaurantId: string) {
    const sixtyDaysAgo = subDays(new Date(), 60);

    const churned = await this.customerAnalyticsRepo.count({
      where: {
        restaurantId,
        lastOrderDate: LessThan(sixtyDaysAgo),
      },
    });

    const total = await this.customerAnalyticsRepo.count({ 
      where: { restaurantId } 
    });

    const avgDaysBetween = await this.customerAnalyticsRepo
      .createQueryBuilder('ca')
      .select('AVG(EXTRACT(DAY FROM (ca.lastOrderDate - ca.firstOrderDate)) / NULLIF(ca.totalOrders - 1, 0))', 'avgDays')
      .where('ca.restaurantId = :restaurantId', { restaurantId })
      .andWhere('ca.totalOrders > 1')
      .getRawOne();

    return {
      churnRate: total > 0 ? (churned / total) * 100 : 0,
      churnedCustomers: churned,
      averageDaysBetweenOrders: parseFloat(avgDaysBetween.avgDays || 0),
    };
  }

  async getTopCustomers(restaurantId: string, limit: number = 10) {
    return this.customerAnalyticsRepo.find({
      where: { restaurantId },
      order: { totalSpent: 'DESC' },
      take: limit,
    });
  }
}
