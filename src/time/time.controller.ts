import { TimeService } from './time.service';
import { Body, Controller, Get, Post, Delete } from '@nestjs/common';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}
  
  @Post('create')
  async create(@Body() clock : {time : Date, month : number, content : string}) {
    console.log(clock);
    const data = await this.timeService.create(clock);
    return data
  }

  @Post('filter')
  async filter(@Body() list : {month : number, checkState : string}) {
    const data = await this.timeService.filter(list);
    return data;
  }

  @Post('update')
  async update(@Body() list : {id : number, content : string}) {
    const data = await this.timeService.update(list);
    return data;
  }

  @Post('delete')
  async delete(@Body() list : {id : number}) {
    const data = await this.timeService.delete(list);
    return data;
  }

  @Get()
  async get() {
    const data = await this.timeService.get();
    return data;
  }
}
