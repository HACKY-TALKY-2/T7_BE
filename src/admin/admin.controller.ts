import {
  Controller,
  UseGuards,
  Res,
  Req,
  Post,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { JwtPayload } from 'src/interfaces/auth';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard('access'))
  @Post('/order/:orderId')
  async postOrderFinish(
    @Req() req: Request,
    @Param('orderId') orderId: number,
    @Res() res: Response,
  ) {
    const { id } = req.user as JwtPayload;
    if (id != 1) {
      throw new UnauthorizedException();
    }
    this.adminService.orderFinish(orderId);
    return res.sendStatus(200);
  }
}
