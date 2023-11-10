import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'src/interfaces/auth';
import { LoginDto } from 'src/dtos/userDto.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getAccessToken(id: number, isAdmin: boolean) {
    console.log(isAdmin);
    const payload: JwtPayload = {
      id: id,
      signedAt: new Date().toISOString(),
      admin: isAdmin,
    };

    const accessJwt = await this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
    });

    return accessJwt;
  }

  async loginUser(loginDto: LoginDto) {
    const { userId, password } = loginDto;
    const user = await this.userService.findUserByUserId(userId);
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!user || !validatePassword) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
