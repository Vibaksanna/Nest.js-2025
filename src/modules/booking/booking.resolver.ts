import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Query(() => [Booking], { name: 'bookings' })
  bookings() {
    return this.bookingService.findAll();
  }

  @Query(() => [Booking])
  getBookingsByDate(
    @Args('start', { type: () => Date }) start: Date,
    @Args('end', { type: () => Date }) end: Date,
  ) {
    return this.bookingService.findByDateRange(start, end);
  }

  @Mutation(() => Booking)
  bookHotel(
    @Args('start_date') start_date: Date,
    @Args('end_date') end_date: Date,
    @Args('hotel_id', { type: () => Int }) hotel_id: number,
    @Args('price', { type: () => Int }) price: number,
  ) {
    return this.bookingService.create({ start_date, end_date, hotel_id, price });
  }

  @Mutation(() => Boolean)
  cancelBooking(@Args('id', { type: () => Int }) id: number) {
    return this.bookingService.cancel(id);
  }

  @Mutation(() => Booking)
  checkIn(@Args('id', { type: () => Int }) id: number) {
    return this.bookingService.checkIn(id);
  }
}