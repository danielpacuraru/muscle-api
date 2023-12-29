import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Workout } from '../schemas/workout.schema';
import { AddWorkoutDto } from '../entities/add-workout.dto';

@Injectable()
export class WorkoutRepository {

  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<Workout>
  ) { }

  async getAll(): Promise<Workout[]> {
    return await this.workoutModel.find({ isActive: true }).exec();
  }

  async get(id: string): Promise<Workout> {
    return await this.workoutModel.findById(id).populate('members').exec();
  }

  async create(data: AddWorkoutDto): Promise<Workout> {
    const workout = new this.workoutModel(data);
    return await workout.save();
  }

}
