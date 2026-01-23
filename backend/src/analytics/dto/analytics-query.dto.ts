import { IsEnum, IsISO8601, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum Granularity {
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export class AnalyticsQueryDto {
  @IsISO8601()
  @Type(() => Date)
  startDate: Date;

  @IsISO8601()
  @Type(() => Date)
  endDate: Date;

  @IsOptional()
  @IsEnum(Granularity)
  granularity?: Granularity = Granularity.DAY;
}
