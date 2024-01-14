import { Controller, Get, Post, Param, Body } from '@nestjs/common';

import { Member } from '../entities/member.decorator';
import { UserID } from '../../auth/decorators/user-id.decorator';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../schemas/workout.schema';
import { AddWorkoutDto } from '../entities/add-workout.dto';

@Controller('workouts')
export class WorkoutController {

  constructor(
    private workoutService: WorkoutService
  ) { }

  @Member()
  @Get('all')
  async getAllllWorkouts(@UserID() userId: string): Promise<Workout[]> {
    console.log(userId);
    return await this.workoutService.getAllllWorkouts();
  }

  @Get()
  async getAllWorkouts(): Promise<Workout[]> {
    return await this.workoutService.getAllWorkouts();
  }

  @Get(':id')
  async getWorkout(@Param('id') workoutId: string): Promise<Workout> {
    return await this.workoutService.getWorkout(workoutId);
  }

  @Post()
  async addWorkout(@Body() data: AddWorkoutDto): Promise<Workout> {
    return await this.workoutService.addWorkout(data);
  }

  @Member()
  @Post(':id/join')
  async joinWorkout(@Param('id') workoutId: string, @UserID() userId: string): Promise<Workout> {
    return await this.workoutService.joinWorkout(workoutId, '659fa99d0efc795f025c662d');
  }

  @Member()
  @Post(':id/leave')
  async leaveWorkout(@Param('id') workoutId: string, @UserID() userId: string): Promise<Workout> {
    return await this.workoutService.leaveWorkout(workoutId, userId);
  }

}
