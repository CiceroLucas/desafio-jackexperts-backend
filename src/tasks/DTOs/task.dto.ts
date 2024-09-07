import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class TaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Max lenght is 50 characteres.' })
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;
}
