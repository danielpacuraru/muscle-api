import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../auth/schemas/user.schema';
import { Workout } from '../schemas/workout.schema';

export enum AttendanceStatus {
  PENDING = 'Pending',
  ATTENDED = 'Attended',
  SKIPPED = 'Skipped',
}

@Schema({ timestamps: true })
export class Student extends Document {

  @Prop({ type: Types.ObjectId, ref: 'Workout' })
  workout: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  student: Types.ObjectId;

  @Prop({ default: AttendanceStatus.PENDING })
  status: AttendanceStatus;

}

export const StudentSchema = SchemaFactory.createForClass(Student).index({ workout: 1, student: 1 }, { unique: true });
