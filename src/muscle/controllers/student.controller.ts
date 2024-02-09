import { Controller, Get, Post, Delete, Param } from '@nestjs/common';

import { Member } from '../../auth/decorators/member.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../auth/schemas/user.schema';

import { StudentService } from '../services/student.service';
import { Student } from '../schemas/student.schema';

@Controller('workouts/:id/students')
export class StudentController {

  constructor(
    private studentService: StudentService
  ) { }

  @Member()
  @Get()
  async getAllStudents(
    @Param('id') workoutId: string
  ): Promise<any[]> {
    const students: Student[] = await this.studentService.getAllStudents(workoutId);
    const list: any[] = [];

    students.map((student: Student) => {
      list.push(student.student);
    });

    return list;
  }

  @Member()
  @Post()
  async addStudent(
    @Param('id') workoutId: string,
    @GetUser() user: User,
  ): Promise<any> {
    const student: Student = await this.studentService.addStudent(workoutId, user._id.toString());
    return student.student;
  }

  @Member()
  @Delete()
  async deleteStudent(
    @Param('id') workoutId: string,
    @GetUser() user: User,
  ): Promise<any> {
    await this.studentService.deleteStudent(workoutId, user._id.toString());
    return { _id: user._id.toString() };
  }

}
