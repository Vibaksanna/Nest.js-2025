import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Booking {
  @Field(() => Int)
  id: number;

  @Field()
  start_date: Date;

  @Field()
  end_date: Date;

  @Field(() => Int)
  hotel_id: number;

  @Field()
  is_checked_in: boolean;

  @Field(() => Int)
  price: number;
}