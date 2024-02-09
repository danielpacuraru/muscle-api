import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Workout extends Document {

  @Prop({ required: true })
  name: string;

  @Prop()
  details?: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  trainer: string;

  @Prop({ default: true })
  isActive: boolean;

}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
