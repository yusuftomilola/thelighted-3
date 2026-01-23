# Restaurant Analytics Module

Comprehensive analytics system for tracking sales, performance, customer insights, and blockchain metrics.

## Features

✅ Dashboard metrics (real-time)
✅ Sales analytics over time
✅ Payment method breakdown
✅ Period-to-period comparisons
✅ Menu item performance tracking
✅ Trending items detection
✅ Customer insights and retention
✅ Blockchain transaction metrics
✅ Loyalty program analytics
✅ CSV/PDF report exports
✅ Redis caching (5-15 min TTL)
✅ Daily aggregation jobs

## API Endpoints

### Dashboard
```bash
GET /api/analytics/restaurants/:restaurantId/dashboard
```

### Sales
```bash
GET /api/analytics/restaurants/:restaurantId/sales
  ?startDate=2025-01-01&endDate=2025-01-31&granularity=day

GET /api/analytics/restaurants/:restaurantId/sales/breakdown
GET /api/analytics/restaurants/:restaurantId/sales/comparison
```

### Menu Performance
```bash
GET /api/analytics/restaurants/:restaurantId/items/top
GET /api/analytics/restaurants/:restaurantId/items/underperforming
GET /api/analytics/restaurants/:restaurantId/items/trending
```

### Customers
```bash
GET /api/analytics/restaurants/:restaurantId/customers
GET /api/analytics/restaurants/:restaurantId/customers/retention
GET /api/analytics/restaurants/:restaurantId/customers/top
```

### Reports
```bash
GET /api/reports/restaurants/:restaurantId/sales
  ?format=csv&startDate=2025-01-01&endDate=2025-01-31&includeCharts=true
```

## Database Schema

### DailyAnalytics
- Aggregated daily statistics
- Indexed on `restaurantId` and `date`
- Stores revenue, orders, crypto volume, tokens

### MenuItemAnalytics
- Per-item daily performance
- Order count, revenue, ratings, conversions
- Indexed on `menuItemId` and `date`

### CustomerAnalytics
- Per-customer lifetime metrics
- Total orders, spending, loyalty tokens
- Tracks favorite items and preferences

## Aggregation Strategy

**Real-time**: Dashboard queries live data
**Daily Job**: Runs at midnight, aggregates previous day
**Historical**: Uses pre-aggregated tables for speed

## Caching

- Dashboard: 5 minutes
- Top items: 15 minutes
- Customer insights: 1 hour
- Redis for cache storage
- Auto-invalidate on order completion

## Calculations

**Revenue**: Sum of completed orders
**AOV**: Total revenue / Order count
**Growth %**: ((Current - Previous) / Previous) × 100
**Conversion**: (Orders / Views) × 100
**Retention**: (Returning / Total) × 100
**Fee Savings**: Traditional fees (2.9%) - Stellar fees (<$0.01)

## Performance

- Dashboard loads < 2 seconds
- Aggregated queries use database indexes
- Pagination for large datasets
- Query builder for dynamic date ranges
- All decimals rounded to 2 places

## Installation

```bash
# Add dependencies
npm install @nestjs/bull @nestjs/schedule bull fast-csv pdfkit canvas chart.js date-fns

# Run migrations
npm run migration:run

# Start aggregation scheduler
npm run start:dev
```

## Testing

```bash
npm test src/analytics
npm run test:cov
```

## Usage Example

```typescript
// Get dashboard metrics
const metrics = await fetch('/api/analytics/restaurants/123/dashboard');

// Get sales for last 30 days
const sales = await fetch(
  '/api/analytics/restaurants/123/sales?startDate=2025-01-01&endDate=2025-01-31'
);

// Export CSV report
window.location.href = '/api/reports/restaurants/123/sales?format=csv&startDate=2025-01-01&endDate=2025-01-31';
```

## Trending Algorithm

Items are "trending" if:
- Order count increased >50% week-over-week
- Newly added items performing well
- Sorted by growth percentage

## Background Jobs

- **Daily aggregation**: 00:00 every day
- **Weekly reports**: Sunday 00:00
- **Cache warming**: Every 6 hours
- **Cleanup old data**: First of month

## Monitoring

- Log aggregation job status
- Track cache hit rates
- Monitor query performance
- Alert on job failures
