import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Roles } from '../entities/roles.enum';

@Schema({ timestamps: true })
export class User extends Document {

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  gender: boolean;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  role: Roles;

  @Prop()
  password?: string;

  @Prop()
  salt?: string;

  @Prop()
  token?: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
