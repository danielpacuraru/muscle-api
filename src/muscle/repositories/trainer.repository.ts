import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Trainer } from '../schemas/trainer.schema';
import { AddTrainerDto } from '../entities/add-trainer.dto';

@Injectable()
export class TrainerRepository {

  constructor(
    @InjectModel(Trainer.name) private trainerModel: Model<Trainer>
  ) { }

  async getAll(): Promise<Trainer[]> {
    return await this.trainerModel.find().exec();
  }

  async create(data: AddTrainerDto): Promise<Trainer> {
    const trainer = new this.trainerModel(data);
    return await trainer.save();
  }

}
