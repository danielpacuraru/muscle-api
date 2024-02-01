import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
          date: 1,
          trainer: 1,
          studentsCount: { $size: '$students' },
        },
      },
    ]).exec();
  }

  async getWorkout(workoutId: string): Promise<Workout> {
    return await this.workoutModel
      .findOne({ _id: workoutId, isActive: true })
      .populate({ path: 'students.student', model: 'User', select: 'firstName lastName phone' })
      .exec();
  }

  async addWorkout(data: AddWorkoutDto): Promise<Workout> {
    const workout = new this.workoutModel(data);
    return await workout.save();
  }

  async joinWorkout(workoutId: string, userId: string): Promise<Workout> {
    const workout: Workout = await this.workoutModel.findOne({ _id: workoutId, isActive: true }).exec();

    if(!workout) {
      throw new NotFoundException();
    }

    const index = workout.students.findIndex(student => student.student.toString() === userId);

    if(index !== -1) {
      throw new BadRequestException();
    }

    workout.students.push({
      student: Types.ObjectId.createFromHexString(userId),
      status: AttendanceStatus.PENDING
    });

    await workout.save();

    return this.getWorkout(workoutId);
  }

  async leaveWorkout(workoutId: string, userId: string): Promise<Workout> {
    const workout: Workout = await this.workoutModel.findOne({ _id: workoutId, isActive: true }).exec();

    if(!workout) {
      throw new NotFoundException();
    }

    const index = workout.students.findIndex(student => student.student.toString() === userId);

    if(index === -1) {
      throw new BadRequestException();
    }

    workout.students.splice(index, 1);

    await workout.save();

    return this.getWorkout(workoutId);
  }

  async getAgenda(userId: string): Promise<Workout[]> {
    const userObj = Types.ObjectId.createFromHexString(userId);

    return await this.workoutModel
      .find({ 'students.student': userObj, isActive: true })
      .select('name date trainer')
      .exec();
  }

}
