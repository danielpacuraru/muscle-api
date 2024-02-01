import { Controller, Get } from '@nestjs/common';

import { Student } from '../../auth/decorators/student.decorator';
import { GetUser } from '../../auth/decorators/user.decorator';
import { User } from '../../auth/schemas/user.schema';

import { WorkoutService } from '../services/workout.service';
import { Workout } from '../schemas/workout.schema';

@Controller()
export class MemberController {

  constructor(
    private workoutService: WorkoutService
  ) { }

  @Student()
  @Get('agenda')
  async getAgenda(
    @GetUser() user: User,
  ): Promise<Workout[]> {
    return await this.workoutService.getAgenda(user._id.toString());
  }

}
