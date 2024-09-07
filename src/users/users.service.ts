import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './DTOs/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(data.password, salt);

      const user = this.repo.create({
        ...data,
        password: hashPassword,
      });

      const createdUser = await this.repo.save(user);

      const { password, ...result } = createdUser;
      return result;
    } catch (err) {
      throw new InternalServerErrorException('Failed to create user.');
    }
  }

  async findOneByEmail(email: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Could not find the user');
    }
    return user;
  }
}
