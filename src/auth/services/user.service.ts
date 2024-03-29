import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../schemas/user.schema';
import { SignupDto } from '../entities/signup.dto';
import { Roles } from '../entities/roles.enum';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  public async create(signupDto: SignupDto): Promise<User | null> {
    return await this.userModel.create(signupDto);
  }

  public async findById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  public async findByPhone(phone: string): Promise<User | null> {
    return await this.userModel.findOne({ phone }).exec();
  }

  public async findByToken(token: string): Promise<User | null> {
    return await this.userModel.findOne({ token }).exec();
  }

  public async getUsers(): Promise<User[]> {
    return await this.userModel.find({ role: Roles.MEMBER });
  }

  public async updatePass(id: string, value: number): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, { $inc: { pass: value } }, { new: true });
  }

}
