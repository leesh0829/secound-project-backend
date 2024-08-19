import { PageStaticInfo } from './../../node_modules/next/dist/build/analysis/get-page-static-info.d';
import { Body, Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaClient } from '@prisma/client';
import prisma from 'component/prisma';

@Injectable()
export class TestService {
  async create(userData : {id : string, password : string}) {
    return await prisma.db_user.create({
      data: {
        id: userData.id,
        password:userData.password,
      },
    });
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
