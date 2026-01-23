import { IsEnum, IsISO8601, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export enum ReportFormat {
  CSV = 'csv',
  PDF = 'pdf',
}

export class ExportReportDto {
  @IsEnum(ReportFormat)
  format: ReportFormat;

  @IsISO8601()
  @Type(() => Date)
  startDate: Date;

  @IsISO8601()
  @Type(() => Date)
  endDate: Date;

  @IsOptional()
  @IsBoolean()
  includeCharts?: boolean = false;
}
