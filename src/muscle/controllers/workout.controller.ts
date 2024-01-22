import { Controller, UseGuards, Get, Post, Param, Body } from '@nestjs/common';

import { Admin } from '../../auth/decorators/admin.decorator';
import { Student } from '../../auth/decorators/student.decorator';
import { GetUser } from '../../auth/decorators/user.decorator';
import { User } from '../../auth/schemas/user.schema';

import { WorkoutService } from '../services/workout.service';
import { Workout } from '../schemas/workout.schema';
import { AddWorkoutDto } from '../entities/add-workout.dto';

@Controller('workouts')
export class WorkoutController {

  constructor(
    private workoutService: WorkoutService
  ) { }

  @Student()
  @Get()
  async getAllWorkouts(): Promise<Workout[]> {
    return await this.workoutService.getAllWorkouts();
  }

  @Student()
  @Get(':id')
  async getWorkout(@Param('id') workoutId: string): Promise<Workout> {
    return await this.workoutService.getWorkout(workoutId);
  }

  @Admin()
  @Post()
  async addWorkout(@Body() data: AddWorkoutDto): Promise<Workout> {
    return await this.workoutService.addWorkout(data);
  }

  @Student()
  @Post(':id/join')
  async joinWorkout(
    @GetUser() user: User,
    @Param('id') workoutId: string
  ): Promise<Workout> {
    return this.workoutService.joinWorkout(workoutId, user._id.toString());
  }

  /*@Member()
  @Post(':id/leave')
  async leaveWorkout(@Param('id') workoutId: string): Promise<Workout> {
    return await this.workoutService.leaveWorkout(workoutId, '659fa99d0efc795f025c662d');
  }*/

}
