import { Controller, Get, Post, Body } from '@nestjs/common';

import { TrainerService } from '../services/trainer.service';
import { Trainer } from '../schemas/trainer.schema';
import { AddTrainerDto } from '../entities/add-trainer.dto';

@Controller('trainers')
export class TrainerController {

  constructor(
    private trainerService: TrainerService
  ) { }

  @Get()
  async getAll(): Promise<Trainer[]> {
    return await this.trainerService.getAll();
  }

  @Post()
  async create(@Body() data: AddTrainerDto): Promise<Trainer> {
    return await this.trainerService.create(data);
  }

}
