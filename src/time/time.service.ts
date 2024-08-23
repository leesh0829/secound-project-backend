import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class TimeService {
  

  async create(clock : {time : Date, month : number, content : string}) {
    try {
      const timedata = await prisma.test.create({
        data: {
          clock : new Date(clock.time),
          month : clock.month,
          content : clock.content,
        },
      });
      console.log(timedata)
    } catch(err) {
      console.error(err)
    }
  }


  async get(list : {time : Date, month : number}) {
    try {
      const listData = await prisma.test.findMany()
      console.log(listData)
    } catch(err) {
      console.error(err)
    }
  }
}
