import { Controller, Get, Post, Param, Body } from '@nestjs/common';

import { Token } from '../entities/token.decorator';
import { UserID } from '../../auth/decorators/user-id.decorator';
import { WorkoutService } from '../services/workout.service';
import { Workout } from '../schemas/workout.schema';
import { AddWorkoutDto } from '../entities/add-workout.dto';

@Controller('workouts')
export class WorkoutController {

  constructor(
    private workoutService: WorkoutService
  ) { }

  @Token()
  @Get()
  async getAll(): Promise<Workout[]> {
    return await this.workoutService.getAll();
  }

  @Token()
  @Post()
  async create(@Body() data: AddWorkoutDto) {
    return await this.workoutService.create(data);
  }

  @Token()
  @Post(':id/join')
  async join(@Param('id') workoutId: string, @UserID() userId: string) {
    return await this.workoutService.join(workoutId, userId);
  }

}
