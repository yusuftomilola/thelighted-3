import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { format } from 'fast-csv';
import PDFDocument from 'pdfkit';
import { ExportReportDto } from '../../analytics/dto/export-report.dto';

@Injectable()
export class ReportsService {
  async generateSalesReport(restaurantId: string, dto: ExportReportDto) {
    if (dto.format === 'csv') {
      return this.generateCSV(restaurantId, dto);
    } else {
      return this.generatePDF(restaurantId, dto);
    }
  }

  private async generateCSV(restaurantId: string, dto: ExportReportDto) {
    const filename = `sales-report-${Date.now()}.csv`;
    const ws = createWriteStream(filename);
    const csvStream = format({ headers: true });

    csvStream.pipe(ws);

    // TODO: Query data and write rows
    csvStream.write({
      date: '2025-01-01',
      orders: 50,
      revenue: 1250.00,
      avgOrderValue: 25.00,
    });

    csvStream.end();
    return filename;
  }

  private async generatePDF(restaurantId: string, dto: ExportReportDto) {
    const filename = `sales-report-${Date.now()}.pdf`;
    const doc = new PDFDocument();
    doc.pipe(createWriteStream(filename));

    doc.fontSize(20).text('Sales Report', 50, 50);
    doc.fontSize(12).text(`Restaurant ID: ${restaurantId}`, 50, 80);
    doc.text(`Period: ${dto.startDate} to ${dto.endDate}`, 50, 100);

    // TODO: Add tables, charts, data

    doc.end();
    return filename;
  }
}
