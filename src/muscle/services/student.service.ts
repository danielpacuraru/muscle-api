import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WorkoutService } from '../services/workout.service';
import { Student } from '../schemas/student.schema';
import { Workout } from '../schemas/workout.schema';

@Injectable()
export class StudentService {

  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    private workoutService: WorkoutService
  ) { }

  async getAllStudents(workoutId: string): Promise<Student[]> {
    return this.studentModel
      .find({ workout: workoutId })
      .populate('student', 'firstName lastName phone')
      .exec();
  }

  async addStudent(workoutId: string, userId: string): Promise<Student> {
    try {
      const student: Student = await this.studentModel.create({ workout: workoutId, student: userId });
      await student.populate('student', 'firstName lastName phone');
      return student;
    }
    catch(e) {
      throw new ConflictException();
    }
  }

  async deleteStudent(workoutId: string, userId: string): Promise<void> {
    const result = await this.studentModel.deleteOne({ workout: workoutId, student: userId });

    if(result.deletedCount === 0) {
      throw new NotFoundException();
    }
  }

}
