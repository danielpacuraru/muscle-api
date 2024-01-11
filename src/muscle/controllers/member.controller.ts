import { Controller, Get, Post, Body } from '@nestjs/common';

import { MemberService } from '../services/member.service';
import { Member } from '../schemas/member.schema';
import { AddMemberDto } from '../entities/add-member.dto';

@Controller('members')
export class MemberController {

  constructor(
    private memberService: MemberService
  ) { }

  @Get()
  async getAll(): Promise<Member[]> {
    return await this.memberService.getAll();
  }

  @Post()
  async create(@Body() data: AddMemberDto): Promise<Member> {
    return await this.memberService.create(data);
  }

}
