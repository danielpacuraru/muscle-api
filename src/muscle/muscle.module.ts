import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Trainer, TrainerSchema } from './schemas/trainer.schema';
import { Workout, WorkoutSchema } from './schemas/workout.schema';

import { TrainerService } from './services/trainer.service';
import { WorkoutService } from './services/workout.service';

import { TrainerController } from './controllers/trainer.controller';
import { WorkoutController } from './controllers/workout.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Trainer.name, schema: TrainerSchema },
      { name: Workout.name, schema: WorkoutSchema },
    ])
  ],
  providers: [
    TrainerService,
    WorkoutService,
  ],
  controllers: [
    TrainerController,
    WorkoutController,
  ]
})
export class MuscleModule { }
