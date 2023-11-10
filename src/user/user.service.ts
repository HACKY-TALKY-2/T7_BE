import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entities';
import { LoginDto } from 'src/dtos/userDto.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }

  async findUserByUserId(userId: string) {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });
    if (!user) return false;
    return user;
  }

  async signupUser(loginDto: LoginDto) {
    const { userId, password } = loginDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.create({
      userId: userId,
      password: hashPassword,
      point: 0,
    });
    return await this.userRepository.save(newUser);
  }
}
