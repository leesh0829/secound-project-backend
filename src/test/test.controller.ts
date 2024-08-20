import { Controller, Get, Post, Body, Patch, Param, Delete, Search } from '@nestjs/common';
import { TestService } from './test.service';
import { UpdateTestDto } from './dto/update-test.dto';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('login')
  async create(@Body() userData : {id : string, password : string}) {
    const data = await this.testService.create(userData);
    return data
  }


  @Post('sign-up')
  async signUp(@Body() userData : {id : string, password : string}) {
    const data = await this.testService.signup(userData);
    return data
  }

  @Get()
  async findAll() {
    const data = await this.testService.findAll();
    return data
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
