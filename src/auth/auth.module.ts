import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
