import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from '../services/reports.service';
import { ExportReportDto } from '../../analytics/dto/export-report.dto';

@Controller('api/reports/restaurants')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get(':restaurantId/sales')
  async exportSales(
    @Param('restaurantId') restaurantId: string,
    @Query() dto: ExportReportDto,
    @Res() res: Response,
  ) {
    const filename = await this.reportsService.generateSalesReport(
      restaurantId,
      dto,
    );

    res.download(filename);
  }
}
