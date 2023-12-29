import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number(),
        JWT_SECRET: Joi.string(),
        MONGO_URL: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true
      }
    })
  ]
})
export class ConfigsModule { }
