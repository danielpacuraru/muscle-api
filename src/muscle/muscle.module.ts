import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { Trainer, TrainerSchema } from './schemas/trainer.schema';
import { Workout, WorkoutSchema } from './schemas/workout.schema';
import { Student, StudentSchema } from './schemas/student.schema';
import { License, LicenseSchema } from './schemas/license.schema';
import { TrainerService } from './services/trainer.service';
import { WorkoutService } from './services/workout.service';
import { StudentService } from './services/student.service';
import { LicenseService } from './services/license.service';
import { LicenseSchedule } from './schedules/license.schedule';
import { TrainerController } from './controllers/trainer.controller';
import { WorkoutController } from './controllers/workout.controller';
import { StudentController } from './controllers/student.controller';
import { LicenseController } from './controllers/license.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Trainer.name, schema: TrainerSchema },
      { name: Workout.name, schema: WorkoutSchema },
      { name: Student.name, schema: StudentSchema },
      { name: License.name, schema: LicenseSchema },
    ]),
    AuthModule,
    FirebaseModule,
  ],
  providers: [
    TrainerService,
    WorkoutService,
    StudentService,
    LicenseService,
    LicenseSchedule,
  ],
  controllers: [
    TrainerController,
    WorkoutController,
    StudentController,
    LicenseController,
  ],
})
export class MuscleModule { }
