import { Injectable } from '@nestjs/common';

import { TrainerRepository } from '../repositories/trainer.repository';
import { Trainer } from '../schemas/trainer.schema';
import { AddTrainerDto } from '../entities/add-trainer.dto';

@Injectable()
export class TrainerService {

  constructor(
    private trainerRepository: TrainerRepository
  ) { }

  async getAll(): Promise<Trainer[]> {
    return await this.trainerRepository.getAll();
  }

  async create(data: AddTrainerDto): Promise<Trainer> {
    return await this.trainerRepository.create(data);
  }

}
