import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async register(body: CreateUserDto) {
    try {
      const res = await this.usersRepository.insert(body);
      return { status: 'ok', res };
    } catch (e) {
      let error = e as QueryFailedError;
      if (error.driverError.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
    }
  }

  async login(body: LoginUserDto) {
    try {
      const { email, username } = await this.usersRepository.findOneBy(body);

      const payload = { sub: email, username };
      const access_token = await this.jwtService.signAsync(payload);
      return { access_token };
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
