export interface Booking {
  name: string;
  dateFrom: Date;
  dateTo: Date;
  totalCost?: number;
  days?: number;
}
