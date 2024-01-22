import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../auth/schemas/user.schema';

export enum AttendanceStatus {
  PENDING = 'Pending',
  ATTENDED = 'Attended',
  SKIPPED = 'Skipped',
}

@Schema()
class Student {

  @Prop({ type: Types.ObjectId, ref: 'User' })
  student: Types.ObjectId;

  @Prop()
  status: AttendanceStatus;

}

const StudentSchema = SchemaFactory.createForClass(Student);

@Schema({ versionKey: false })
export class Workout extends Document {

  @Prop({ required: true })
  name: string;

  @Prop()
  details?: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  trainer: string;

  @Prop({ type: [StudentSchema] })
  students: Student[];

  @Prop({ default: true })
  isActive: boolean;

}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
