import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { WorkoutRepository } from '../repositories/workout.repository';
import { Workout } from '../schemas/workout.schema';
import { AddWorkoutDto } from '../entities/add-workout.dto';

@Injectable()
export class WorkoutService {

  constructor(
    private workoutRepository: WorkoutRepository
  ) { }

  async getAll(): Promise<Workout[]> {
    return await this.workoutRepository.getAll();
  }

  async create(data: AddWorkoutDto): Promise<Workout> {
    return await this.workoutRepository.create(data);
  }

  async join(workoutId: string, userId: string) {
    const workout: Workout = await this.workoutRepository.get(workoutId);
    console.log(workout);
    workout.members.push(Types.ObjectId.createFromHexString(userId));
    await workout.save();
  }

}
