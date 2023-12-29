import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../schemas/user.schema';
import { SignupDto } from '../dtos/signup.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  public async create(signupDto: SignupDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signupDto.password, salt);

    const newUser = await this.userModel.create({
      name: signupDto.name,
      email: signupDto.email,
      password: hashedPassword,
      salt: salt,
    });

    return newUser;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

}
