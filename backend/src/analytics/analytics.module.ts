import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { DailyAnalytics } from './entities/daily-analytics.entity';
import { MenuItemAnalytics } from './entities/menu-item-analytics.entity';
import { CustomerAnalytics } from './entities/customer-analytics.entity';
import { AnalyticsController } from './controllers/analytics.controller';
import { DashboardService } from './services/dashboard.service';
import { SalesAnalyticsService } from './services/sales-analytics.service';
import { MenuAnalyticsService } from './services/menu-analytics.service';
import { CustomerAnalyticsService } from './services/customer-analytics.service';
import { AggregationService } from './services/aggregation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DailyAnalytics,
      MenuItemAnalytics,
      CustomerAnalytics,
    ]),
    CacheModule.register({
      ttl: 300,
      max: 100,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AnalyticsController],
  providers: [
    DashboardService,
    SalesAnalyticsService,
    MenuAnalyticsService,
    CustomerAnalyticsService,
    AggregationService,
  ],
  exports: [
    DashboardService,
    SalesAnalyticsService,
    MenuAnalyticsService,
    CustomerAnalyticsService,
  ],
})
export class AnalyticsModule {}
