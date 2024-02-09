import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Trainer, TrainerSchema } from './schemas/trainer.schema';
import { Workout, WorkoutSchema } from './schemas/workout.schema';
import { Student, StudentSchema } from './schemas/student.schema';

import { TrainerService } from './services/trainer.service';
import { WorkoutService } from './services/workout.service';
import { StudentService } from './services/student.service';

import { TrainerController } from './controllers/trainer.controller';
import { WorkoutController } from './controllers/workout.controller';
import { StudentController } from './controllers/student.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Trainer.name, schema: TrainerSchema },
      { name: Workout.name, schema: WorkoutSchema },
      { name: Student.name, schema: StudentSchema },
    ])
  ],
  providers: [
    TrainerService,
    WorkoutService,
    StudentService,
  ],
  controllers: [
    TrainerController,
    WorkoutController,
    StudentController,
  ],
})
export class MuscleModule { }
