import { query } from 'express';
import { TimeService } from './time.service';
import { Body, Controller, Get, Post, Delete, Patch, Query } from '@nestjs/common';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}
  
  @Post('create')
  async create(@Body() clock : {time : Date, month : number, content : string}) {
    const data = await this.timeService.create(clock);
    return data
  }

  @Patch()
  async update(@Body() list : {id : number, content : string, check : number}) {
    const data = await this.timeService.update(list);
    return data;
  }

  @Delete()
  async delete(@Body() list : {id : number}) {
    const data = await this.timeService.delete(list);
    return data;
  }

  @Get()
  async get(@Query() query : {sort : string}) {
    const data = await this.timeService.get(query.sort);
    return data;
  }
}
