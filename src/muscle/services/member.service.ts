import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Member } from '../schemas/member.schema';
import { AddMemberDto } from '../entities/add-member.dto';

@Injectable()
export class MemberService {

  constructor(
    @InjectModel(Member.name) private memberModel: Model<Member>
  ) { }

  async getAll(): Promise<Member[]> {
    return await this.memberModel.find().exec();
  }

  async getById(id: string): Promise<Member> {
    return await this.memberModel.findById(id).exec();
  }

  async create(data: AddMemberDto): Promise<Member> {
    const member = new this.memberModel(data);
    return await member.save();
  }

}
