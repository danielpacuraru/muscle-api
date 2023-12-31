import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Workout } from '../schemas/workout.schema';
import { AddWorkoutDto } from '../entities/add-workout.dto';

@Injectable()
export class WorkoutService {

  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<Workout>
  ) { }

  async getAllWorkouts(): Promise<Workout[]> {
    return await this.workoutModel.find({ isActive: true }).exec();
  }

  async getWorkout(workoutId: string): Promise<Workout> {
    return await this.workoutModel
      .findOne({ _id: workoutId, isActive: true })
      .populate({ path: 'members', select: 'name email' })
      .exec();
  }

  async addWorkout(data: AddWorkoutDto): Promise<Workout> {
    const workout = new this.workoutModel(data);
    return await workout.save();
  }

  async joinWorkout(workoutId: string, userId: string): Promise<Workout> {
    const workout: Workout = await this.workoutModel.findOne({ _id: workoutId, isActive: true }).exec();
    const userIdObj = Types.ObjectId.createFromHexString(userId);

    if(!workout) {
      throw new NotFoundException();
    }

    if(workout.members.includes(userIdObj)) {
      return workout;
    }

    workout.members.push(userIdObj);

    return await workout.save();
  }

  async leaveWorkout(workoutId: string, userId: string): Promise<Workout> {
    const workout: Workout = await this.workoutModel.findOne({ _id: workoutId, isActive: true }).exec();
    const userIdObj = Types.ObjectId.createFromHexString(userId);

    if(!workout) {
      throw new NotFoundException();
    }

    if(!workout.members.includes(userIdObj)) {
      return workout;
    }

    workout.members.splice(workout.members.indexOf(userIdObj), 1);

    return await workout.save();
  }

}
