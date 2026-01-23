import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyAnalytics } from '../entities/daily-analytics.entity';
import { AnalyticsQueryDto } from '../dto/analytics-query.dto';
import { Repository, Between } from 'typeorm';

@Injectable()
export class SalesAnalyticsService {
  constructor(
    @InjectRepository(DailyAnalytics)
    private dailyAnalyticsRepo: Repository<DailyAnalytics>,
  ) {}

  async getSalesOverTime(restaurantId: string, query: AnalyticsQueryDto) {
    const data = await this.dailyAnalyticsRepo.find({
      where: {
        restaurantId,
        date: Between(query.startDate, query.endDate),
      },
      order: { date: 'ASC' },
    });

    return data.map(d => ({
      date: d.date,
      revenue: parseFloat(d.totalRevenue.toString()),
      orders: d.totalOrders,
      averageOrderValue: parseFloat(d.averageOrderValue.toString()),
    }));
  }

  async getPaymentBreakdown(restaurantId: string, query: AnalyticsQueryDto) {
    const data = await this.dailyAnalyticsRepo
      .createQueryBuilder('da')
      .select('SUM(da.totalRevenue)', 'fiatTotal')
      .addSelect('SUM(da.cryptoRevenue)', 'cryptoTotal')
      .addSelect('SUM(da.xlmVolume)', 'xlmTotal')
      .addSelect('SUM(da.usdcVolume)', 'usdcTotal')
      .where('da.restaurantId = :restaurantId', { restaurantId })
      .andWhere('da.date BETWEEN :start AND :end', {
        start: query.startDate,
        end: query.endDate,
      })
      .getRawOne();

    return {
      fiat: parseFloat(data.fiatTotal || 0),
      crypto: parseFloat(data.cryptoTotal || 0),
      xlm: parseFloat(data.xlmTotal || 0),
      usdc: parseFloat(data.usdcTotal || 0),
    };
  }

  async getPeriodComparison(restaurantId: string, query: AnalyticsQueryDto) {
    // Calculate current and previous period metrics
    const current = await this.getSalesOverTime(restaurantId, query);
    
    const periodLength = query.endDate.getTime() - query.startDate.getTime();
    const previousStart = new Date(query.startDate.getTime() - periodLength);
    const previousEnd = new Date(query.endDate.getTime() - periodLength);
    
    const previous = await this.getSalesOverTime(restaurantId, {
      ...query,
      startDate: previousStart,
      endDate: previousEnd,
    });

    const currentTotal = current.reduce((sum, d) => sum + d.revenue, 0);
    const previousTotal = previous.reduce((sum, d) => sum + d.revenue, 0);
    const growth = previousTotal > 0 
      ? ((currentTotal - previousTotal) / previousTotal) * 100 
      : 0;

    return {
      current: { data: current, total: currentTotal },
      previous: { data: previous, total: previousTotal },
      growth: parseFloat(growth.toFixed(2)),
    };
  }
}
