import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import { Hotel } from './hotel.entity';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';

@Resolver(() => Hotel)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Mutation(() => Hotel)
  createHotel(@Args('input') input: CreateHotelInput) {
    return this.hotelService.create(input);
  }

  @Query(() => [Hotel], { name: 'getAllHotels' })
  findAll() {
    return this.hotelService.findAll();
  }

  @Query(() => Hotel, { name: 'getHotel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.hotelService.findOne(id);
  }

  @Mutation(() => Hotel)
  updateHotel(@Args('input') input: UpdateHotelInput) {
    return this.hotelService.update(input);
  }

  @Mutation(() => Boolean)
  deleteHotel(@Args('id', { type: () => Int }) id: number) {
    return this.hotelService.remove(id);
  }
}
