import { TimeService } from './time.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}
  
  @Post()
  async create(@Body() clock : {time : Date, month : number, content : string}) {
    console.log(clock);
    const data = await this.timeService.create(clock);
    return data
  }

  @Get()
  async get(@Body() list : {time : Date, month : number}) {
    const data = await this.timeService.get(list);
    return data;
  }
}
