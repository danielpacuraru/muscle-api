import { Controller, Get, Post, Param, Body } from '@nestjs/common';

import { Token } from '../../auth/decorators/token.decorator';
import { Admin } from '../../auth/decorators/admin.decorator';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../schemas/workout.schema';
import { AddWorkoutDto } from '../entities/add-workout.dto';

@Controller()
export class WorkoutController {

  constructor(
    private workoutService: WorkoutService
  ) { }

  @Token()
  @Get('workouts')
  async getAllWorkouts(
  ): Promise<any[]> {
    const workouts: Workout[] = await this.workoutService.getAllActiveWorkouts();
    const list: any[] = [];

    workouts.map((workout: Workout) => {
      list.push({
        _id: workout._id.toString(),
        name: workout.name,
        details: workout.details,
        date: workout.date,
        trainer: workout.trainer
      });
    });

    return list;
  }

  @Token()
  @Get('workouts/:id')
  async getWorkout(
    @Param('id') workoutId: string
  ): Promise<any> {
    const workout: Workout = await this.workoutService.getActiveWorkout(workoutId);
    return {
      _id: workout.id,
      name: workout.name,
      details: workout.details,
      date: workout.date,
      trainer: workout.trainer
    };
  }

  @Admin()
  @Post('workouts')
  async addWorkout(
    @Body() data: AddWorkoutDto
  ): Promise<Workout> {
    return this.workoutService.addWorkout(data);
  }

}
