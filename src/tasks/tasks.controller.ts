import {
  Get,
  Post,
  Controller,
  Request,
  UseGuards,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTasks(@Request() req, @Body() getTasksDto: GetTasksDto) {
    return this.tasksService.getTasks(getTasksDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateTask(
    @Request() req,
    @Param('id') id,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTask(
    @Request() req,
    @Param('id') id,
    @Body() deleteTaskDto: DeleteTaskDto,
  ) {
    return this.tasksService.deleteTask(id, deleteTaskDto, req.user);
  }
}
