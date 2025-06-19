import { Injectable, NotFoundException } from '@nestjs/common';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
  private bookings: Booking[] = [];
  private idCounter = 1;

  create(input: Omit<Booking, 'id' | 'is_checked_in'>): Booking {
    const newBooking: Booking = {
      id: this.idCounter++,
      ...input,
      is_checked_in: false,
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  cancel(id: number): boolean {
    const index = this.bookings.findIndex(b => b.id === id);
    if (index > -1) {
      this.bookings.splice(index, 1);
      return true;
    }
    throw new NotFoundException(`Booking with id ${id} not found`);
  }

  checkIn(id: number): Booking {
    const booking = this.bookings.find(b => b.id === id);
    if (!booking) throw new NotFoundException(`Booking with id ${id} not found`);
    booking.is_checked_in = true;
    return booking;
  }

  findByDateRange(start: Date, end: Date): Booking[] {
    return this.bookings.filter(
      b =>
        new Date(b.start_date) >= new Date(start) &&
        new Date(b.end_date) <= new Date(end),
    );
  }

  findAll(): Booking[] {
    return this.bookings;
  }
}