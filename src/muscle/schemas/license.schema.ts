import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum LicenseStatus {
  ACTIVE = 'Active',
  EXPIRED = 'Expired',
}

@Schema({ timestamps: true })
export class License extends Document {

  @Prop({ required: true })
  entryCount: number;

  @Prop({ required: true })
  expireDate: Date;

  @Prop({ default: LicenseStatus.ACTIVE })
  status: LicenseStatus;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

}

export const LicenseSchema = SchemaFactory.createForClass(License);
