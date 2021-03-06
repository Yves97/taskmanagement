import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaksDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './tasks.status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository : TaskRepository
    ){}

    getTasks(
        filterDto : GetTasksFilterDto,
        user : User
        ):Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto,user)
    }
    

    async getTaskById(id:number,user:User):Promise<Task>{
        const found = await this.taskRepository.findOne({where : {id,userId : user.id}})
        if(!found){
            throw new NotFoundException(`Task with id ${id} not found`)
        }
        return found
    }

    async createTask(
        createTaskDto : CreateTaksDto,
        user : User
        ): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto,user)
    }

    async deleteTask(id:number,user : User): Promise<void>{ 
        const result = await this.taskRepository.delete({id,userId : user.id})
        if(result.affected === 0){
            throw new NotFoundException(`Task with id ${id} not found`)
        }
    }

    async updateTaskStatus(
        id:number,
        status:TaskStatus,
        user :User):Promise<Task>{
        const task = await this.getTaskById(id,user)
        task.status = status
        await task.save()
        return task
    }
}
