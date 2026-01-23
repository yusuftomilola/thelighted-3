import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SalesAnalyticsService } from './sales-analytics.service';
import { DailyAnalytics } from '../entities/daily-analytics.entity';

describe('SalesAnalyticsService', () => {
  let service: SalesAnalyticsService;

  const mockRepository = {
    find: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getRawOne: jest.fn(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesAnalyticsService,
        {
          provide: getRepositoryToken(DailyAnalytics),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SalesAnalyticsService>(SalesAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate sales over time', async () => {
    const mockData = [
      { date: new Date('2025-01-01'), totalRevenue: 1000, totalOrders: 50 },
    ];
    mockRepository.find.mockResolvedValue(mockData);

    const result = await service.getSalesOverTime('restaurant-1', {
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-31'),
    });

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});
