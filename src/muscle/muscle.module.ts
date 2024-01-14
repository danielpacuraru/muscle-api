import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Member, MemberSchema } from './schemas/member.schema';
import { Trainer, TrainerSchema } from './schemas/trainer.schema';
import { Workout, WorkoutSchema } from './schemas/workout.schema';

import { MemberService } from './services/member.service';
import { TrainerService } from './services/trainer.service';
import { WorkoutService } from './services/workout.service';

import { MemberController } from './controllers/member.controller';
import { TrainerController } from './controllers/trainer.controller';
import { WorkoutController } from './controllers/workout.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Member.name, schema: MemberSchema },
      { name: Trainer.name, schema: TrainerSchema },
      { name: Workout.name, schema: WorkoutSchema },
    ])
  ],
  providers: [
    MemberService,
    TrainerService,
    WorkoutService,
  ],
  controllers: [
    MemberController,
    TrainerController,
    WorkoutController,
  ],
  exports: [
    MemberService
  ],
})
export class MuscleModule { }
