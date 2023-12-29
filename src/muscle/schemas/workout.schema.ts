import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from '../../auth/schemas/user.schema';

@Schema({ versionKey: false })
export class Workout extends Document {

  @Prop({ required: true })
  trainerName: string;

  @Prop({ required: true })
  trainerSkill: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  members: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;

}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
