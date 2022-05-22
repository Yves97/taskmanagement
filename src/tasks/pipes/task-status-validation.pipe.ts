import { ArgumentMetadata, BadRequestException, ConsoleLogger, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasks.status.enum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    transform(value: any) {
        value = value.toUpperCase()
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is an invalid status`)
        }
        return value
    }

    private isStatusValid(status : any){
        const idx = this.allowedStatus.indexOf(status)
        return idx !== -1
    }
}