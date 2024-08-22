import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class TimeService {
  

  async create(clock : {time : Date}) {
    try {
      const timedata = await prisma.test.create({
        data: {
          clock : new Date(clock.time),
          name : '',
        },
      });
      console.log(timedata)
    } catch(err) {
      console.error(err)
    }
  }
}
