import { UserEntity } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;

  @Column()
  userId: number;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  COMPLETED = 'COMPLETED',
}
