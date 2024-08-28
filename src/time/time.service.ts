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
          },
        });

        const data = await prisma.test.findMany({
          select: {
            id: false,
            clock: false,
            content: true,
            month: false,
          }
        })
        return data
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

  
  async update(list : {id : number, content : string}) {
    await prisma.test.update({
      where: {
        id: list.id,
      },
      data: {
        content: list.content
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

  async filter(list : {month : number, checkState : string}) {
    if(list.checkState === "ACTIVE") { //ACTIVE
      const Data = await prisma.test.findMany({
        where: {
          month : list.month,
          check : 0
        },
        orderBy: {
          clock: 'desc'
        },
        select: {
          id: true,
          clock: false,
          content: false,
          month: false,
        },
      })
      return Data
    } else if(list.checkState === "COMPLETE") { //COMPLETE
      const Data = await prisma.test.findMany({
        where: {
          month : list.month,
          check : 1
        },
        orderBy: {
          clock: 'desc'
        },
        select: {
          id: true,
          clock: false,
          content: false,
          month: false,
        },
      })
      return Data
    } else { //ALL
      const Data = await prisma.test.findMany({
        where: {
          month : list.month,
        },
        orderBy: {
          clock: 'desc'
        },
        select: {
          id: true,
          clock: false,
          content: false,
          month: false,
        },
      })
      return Data
    }
  }
}
