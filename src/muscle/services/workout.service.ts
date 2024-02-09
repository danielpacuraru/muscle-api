import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Workout } from '../schemas/workout.schema';
import { Student } from '../schemas/student.schema';
import { AddWorkoutDto } from '../entities/add-workout.dto';

@Injectable()
export class WorkoutService {

  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<Workout>,
    @InjectModel(Student.name) private studentModel: Model<Student>
  ) { }

  async getAllActiveWorkouts(): Promise<Workout[]> {
    return this.workoutModel.find({ isActive: true }).exec();
  }

  async getActiveWorkout(workoutId: string): Promise<Workout> {
    if(!Types.ObjectId.isValid(workoutId)) {
      throw new NotFoundException();
    }

    const workout: Workout = await this.workoutModel.findOne({ _id: workoutId, isActive: true }).exec();

    if(!workout) {
      throw new NotFoundException();
    }

    return workout;
  }

  async addWorkout(data: AddWorkoutDto): Promise<Workout> {
    const workout = new this.workoutModel(data);
    return await workout.save();
  }

  async getAgenda(userId: string): Promise<Workout[]> {
    const userObj = Types.ObjectId.createFromHexString(userId);

    return await this.workoutModel
      .find({ 'students.student': userObj, isActive: true })
      .select('name date trainer')
      .exec();
  }

}
