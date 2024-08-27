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
    //console.log(data)
    return data
  }

  async filter(list : {time : Date, month : number, filterState : string}) {
    if(list.filterState === 'month') {
      const data = await prisma.test.findMany({
        where: {
          month : list.month,
        },
        select: {
          id: true, //false
          clock: false,
          content: false, //true
          month: false,
        }
      })
      return data
    }
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
    await prisma.test.delete({ //삭제할 때 프론트엔드에서는 인덱스가 정렬되는데 벡엔드는 되지 않아 2개 부터 오류남, 그래서 이 delete문 전에 id를 정렬하는게 필요
      where: {
        id: list.id,
      },
    })
  }

  async order(list : {month : number, filterState : string}) {
    if(list.filterState === 'asc') {
      const ascOrders = await prisma.test.findMany({
        where: {
          month : list.month,
        },
        orderBy: {
          clock: 'asc'
        },
        select: {
          id: false,
          clock: false,
          content: true,
          month: false,
        },
      })
      //console.log(ascOrders)
      return ascOrders
    }

    if(list.filterState === 'desc') { //내림차순 하고 수정하면 인덱스가 바뀌지 않아 이상한게 수정됨 그래서 id를 바꿔서 그냥 출력하던지를 해야함
      const descOrders = await prisma.test.findMany({
        where: {
          month : list.month,
        },
        orderBy: {
          clock: 'desc'
        },
        select: {
          id: false,
          clock: false,
          content: true,
          month: false,
        },
      })
      //console.log(descOrders)
      return descOrders
    }
  }
}
