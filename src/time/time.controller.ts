import { TimeService } from './time.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}
  
  @Post()
  async create(@Body() clock : {time : Date, }) {
    const data = await this.timeService.create(clock);
    return data
  }
}
