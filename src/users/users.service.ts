import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUser(login: string) {
    return this.usersRepository.findOne({ where: { login } });
  }

  async createUser(createUserDto: CreateUserDto) {
    const existedUser = await this.usersRepository.findOne({
      where: { login: createUserDto.login },
    });

    if (existedUser) {
      throw new Error('user already exists');
    }

    const user = new User();
    user.login = createUserDto.login;
    user.password = createUserDto.password;

    return this.usersRepository.save(user);
  }
}
