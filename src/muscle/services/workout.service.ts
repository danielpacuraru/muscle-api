import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Workout, AttendanceStatus } from '../schemas/workout.schema';
import { AddWorkoutDto } from '../entities/add-workout.dto';

@Injectable()
export class WorkoutService {

  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<Workout>
  ) { }

  async getAllWorkouts(): Promise<Workout[]> {
    return await this.workoutModel.aggregate([
      {
        $match: { isActive: true },
      },
      {
        $project: {
          name: 1,
          coach: 1,
          date: 1,
          students: { $size: '$students' },
        },
      },
    ]).exec();
  }

  async getWorkout(workoutId: string): Promise<Workout> {
    return await this.workoutModel
      .findOne({ _id: workoutId, isActive: true })
      .populate({ path: 'students.member', model: 'Member', select: 'firstName lastName' })
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

    /*if(workout.members.includes(userIdObj)) {
      return workout;
    }*/

    workout.students.push({
      member: userIdObj,
      status: AttendanceStatus.PENDING
    });

    return await workout.save();
  }

  async leaveWorkout(workoutId: string, userId: string): Promise<Workout> {
    const workout: Workout = await this.workoutModel.findOne({ _id: workoutId, isActive: true }).exec();
    const userIdObj = Types.ObjectId.createFromHexString(userId);

    if(!workout) {
      throw new NotFoundException();
    }

    /*if(!workout.members.includes(userIdObj)) {
      return workout;
    }

    workout.members.splice(workout.members.indexOf(userIdObj), 1);*/

    return await workout.save();
  }

}
