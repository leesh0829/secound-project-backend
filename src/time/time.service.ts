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
        
        await prisma.test.create({
          data: {
            id : newId,
            clock : new Date(clock.time),
            month : clock.month,
            content : clock.content,
            check : 0,
          },
        });

        const data = await prisma.test.findMany({
          select: {
            id: true,
            clock: true,
            content: true,
            month: true,
            check : true
          }
        })
        return data
      });
    } catch(err) {
      console.error(err)
    }
  }

  async get(sort : string) {
    const data = await prisma.test.findMany({
      select: {
        id: true,
        clock: true,
        content: true,
        month: true,
        check : true
      },
      orderBy : {
        clock : sort === 'desc' ? 'desc' : 'asc',
      }
    })
    return data
  }

  
  async update(list : {id : number, content : string, check : number}) {
    await prisma.test.updateMany({
      where: {
        id: list.id,
      },
      data: {
        content: list.content,
        check: list.check,
      }
    })
  }
  
  async delete(list : {id : number}) {
    await prisma.test.delete({
      where: {
        id: list.id,
      },
    })

    const data = await prisma.test.findMany({
      select: {
        id: true,
        clock: false,
        content: false,
        month: false,
      }
    })
    
    for(let i = list.id + 1; i<data.length + 2; i++) {
      await prisma.test.update({
        where: {
          id: i,
        },
        data: {
          id: i - 1,
        }
      })
    }    
  }
}
