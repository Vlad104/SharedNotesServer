import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/tasks.entity';
import { User } from 'src/entities/users.entity';
import { GetTasksDto } from './dto/get-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  getTasks(_getTasksDto: GetTasksDto, user: User): Promise<Task[]> {
    return this.tasksRepository.find({ where: { user } });
  }

  createTask(createTaskDto: CreateTaskDto, user: User) {
    const task = new Task();
    task.user = user;
    task.text = createTaskDto.text;

    return this.tasksRepository.save(task);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto, user: User) {
    return this.tasksRepository
      .createQueryBuilder()
      .update(Task)
      .set({ text: updateTaskDto.text })
      .where({ id, user: user.login })
      .execute();
  }

  deleteTask(id: string, _delxeteTaskDto: DeleteTaskDto, user: User) {
    return this.tasksRepository
      .createQueryBuilder()
      .delete()
      .where({ id, user: user.login })
      .execute();
  }
}
