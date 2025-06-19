import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookingModule } from './modules/booking/booking.module'; // <-- Fix here
import { HotelModule } from './modules/hotel/hotel.module';

import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    BookingModule, // <-- And here
    HotelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}