import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Injectable()
export class TimeService {
  async create(clock : {time : Date, month : number, content : string}) { 
    try {
      await prisma.$transaction(async (prisma) => {
        const usedIds = await prisma.test.findMany({
          select: { id: true },
        });
        let newId = 1;
        while (usedIds.some((item) => item.id === newId)) {
          newId++;
        }
        
        const timedata = await prisma.test.create({
          data: {
            id : newId, //고유한 id값을 집어넣을수 없음
            clock : new Date(clock.time),
            month : clock.month,
            content : clock.content,
          },
        });
        console.log(timedata)
      });
    } catch(err) {
      console.error(err)
    }
  }


  async get() {
    const data = await prisma.test.findMany({
      select: {
        id: false,
        clock: false,
        content: true,
        month: false,
      }
    })
    return data
  }

  async filter(list : {time : Date, month : number, filterState : string}) {
    if(list.filterState === 'month') {
      const data = await prisma.test.findMany({
        where: {
          month : list.month,
        },
        select: {
          id: false,
          clock: false,
          content: true,
          month: false,
        }
      })
      return data
    }
  }

  async update(list : {id : number, content : string}) {
    await prisma.test.update({
      where: {
        id: list.id + 1,
      },
      data: {
        content: list.content
      }
    })
  }

  async delete(list : {id : number}) {
    await prisma.test.delete({
      where: {
        id: list.id + 1,
      },
    })
  }
}
