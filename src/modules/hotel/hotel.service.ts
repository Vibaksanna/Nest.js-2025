import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';
import { Hotel } from './hotel.entity';

@Injectable()
export class HotelService {
  private hotels: Hotel[] = [];
  private idCounter = 1;

  create(input: CreateHotelInput): Hotel {
    const newHotel: Hotel = { id: this.idCounter++, ...input };
    this.hotels.push(newHotel);
    return newHotel;
  }

  findAll(): Hotel[] {
    return this.hotels;
  }

  findOne(id: number): Hotel {
    const hotel = this.hotels.find(h => h.id === id);
    if (!hotel) {
      throw new NotFoundException(`Hotel with id ${id} not found`);
    }
    return hotel;
  }

  update(input: UpdateHotelInput): Hotel {
    const hotel = this.findOne(input.id);
    Object.assign(hotel, input);
    return hotel;
  }

  remove(id: number): boolean {
    const index = this.hotels.findIndex(h => h.id === id);
    if (index > -1) {
      this.hotels.splice(index, 1);
      return true;
    }
    throw new NotFoundException(`Hotel with id ${id} not found`);
  }
}
