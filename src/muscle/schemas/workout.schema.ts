import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Member } from '../schemas/member.schema';

export enum AttendanceStatus {
  PENDING = 'Pending',
  ATTENDED = 'Attended',
  SKIPPED = 'Skipped',
}

@Schema()
class Student {

  @Prop({ type: Types.ObjectId, ref: 'Member' })
  member: Types.ObjectId;

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
  coach: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [StudentSchema] })
  students: Student[];

}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
