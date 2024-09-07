import { Request } from 'express';
import { UserEntity } from 'src/users/user.entity';

export interface AuthRequest extends Request {
  user: UserEntity;
}
