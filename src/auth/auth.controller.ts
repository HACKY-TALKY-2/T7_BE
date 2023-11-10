import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from 'src/dtos/userDto.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.authService.loginUser(loginDto);
    const isAdmin = user.userId == 'admin';
    const token = await this.authService.getAccessToken({
      id: user.id,
      isAdmin: isAdmin,
    });

    return res.json({
      token: token,
    });
  }

  @Post('/signup')
  async signup(@Body() signupDto: LoginDto, @Res() res: Response) {
    const { userId } = signupDto;
    const user = await this.userService.findUserByUserId(userId);
    if (user) {
      return res.sendStatus(409);
    }

    try {
      await this.userService.signupUser(signupDto);
    } catch (err) {
      return res.send(err);
    }
    return res.sendStatus(201);
  }
}
