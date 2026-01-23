import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from '../services/dashboard.service';
import { SalesAnalyticsService } from '../services/sales-analytics.service';
import { MenuAnalyticsService } from '../services/menu-analytics.service';
import { CustomerAnalyticsService } from '../services/customer-analytics.service';
import { AnalyticsQueryDto } from '../dto/analytics-query.dto';

@Controller('api/analytics/restaurants')
export class AnalyticsController {
  constructor(
    private dashboardService: DashboardService,
    private salesService: SalesAnalyticsService,
    private menuService: MenuAnalyticsService,
    private customerService: CustomerAnalyticsService,
  ) {}

  @Get(':restaurantId/dashboard')
  async getDashboard(@Param('restaurantId') restaurantId: string) {
    return this.dashboardService.getDashboardMetrics(restaurantId);
  }

  @Get(':restaurantId/sales')
  async getSales(
    @Param('restaurantId') restaurantId: string,
    @Query() query: AnalyticsQueryDto,
  ) {
    return this.salesService.getSalesOverTime(restaurantId, query);
  }

  @Get(':restaurantId/sales/breakdown')
  async getBreakdown(
    @Param('restaurantId') restaurantId: string,
    @Query() query: AnalyticsQueryDto,
  ) {
    return this.salesService.getPaymentBreakdown(restaurantId, query);
  }

  @Get(':restaurantId/sales/comparison')
  async getComparison(
    @Param('restaurantId') restaurantId: string,
    @Query() query: AnalyticsQueryDto,
  ) {
    return this.salesService.getPeriodComparison(restaurantId, query);
  }

  @Get(':restaurantId/items/top')
  async getTopItems(@Param('restaurantId') restaurantId: string) {
    return this.menuService.getTopPerformingItems(restaurantId);
  }

  @Get(':restaurantId/items/underperforming')
  async getUnderperforming(@Param('restaurantId') restaurantId: string) {
    return this.menuService.getUnderperformingItems(restaurantId);
  }

  @Get(':restaurantId/items/trending')
  async getTrending(@Param('restaurantId') restaurantId: string) {
    return this.menuService.getTrendingItems(restaurantId);
  }

  @Get(':restaurantId/customers')
  async getCustomers(@Param('restaurantId') restaurantId: string) {
    return this.customerService.getCustomerInsights(restaurantId);
  }

  @Get(':restaurantId/customers/retention')
  async getRetention(@Param('restaurantId') restaurantId: string) {
    return this.customerService.getRetentionMetrics(restaurantId);
  }

  @Get(':restaurantId/customers/top')
  async getTopCustomers(@Param('restaurantId') restaurantId: string) {
    return this.customerService.getTopCustomers(restaurantId);
  }
}
