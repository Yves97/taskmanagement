import { IsNotEmpty } from 'class-validator';
export class CreateTaksDto {
    @IsNotEmpty()
    title : string;
    
    @IsNotEmpty()
    description : string;
}