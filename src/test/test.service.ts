import { Body, Injectable } from '@nestjs/common';
import { UpdateTestDto } from './dto/update-test.dto';
import prisma from 'component/prisma';
import { NextResponse } from 'next/server';

@Injectable()
export class TestService {

  async create(userData : {id : string, password : string}) {
    try {
      const data = await prisma.db_user.findFirst({
        where : {
          id : userData.id,
        },
      });
      console.log(data)
      if(data) {
        if (userData.password === data?.password)
        {
          return 1
        }
      }
    } catch(err) {
      console.error(err)
    }
  }

  async signup(userData : {id : string, password : string}) {
    const data = await prisma.db_user.findFirst({
      where : {
        id : userData.id,
      },
    });
    if(data) {
      return NextResponse.json("이미 존재하는 아이디 입니다.")
    } else {
      try {
        await prisma.db_user.create({
          data: {
            id: userData.id,
            password:userData.password,
          },
        });
      } catch(err) {
        console.error(err)
      }
    }
  }

  async findAll() {
    return await prisma.db_user.findMany()
  }

  async findFirst() {
    
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
