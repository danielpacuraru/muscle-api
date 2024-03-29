import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { ConfigsModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { MuscleModule } from './muscle/muscle.module';

@Module({
  imports: [
    ConfigsModule,
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGO_URL')
      }),
      inject: [ConfigService]
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    MuscleModule
  ]
})
export class AppModule {}
