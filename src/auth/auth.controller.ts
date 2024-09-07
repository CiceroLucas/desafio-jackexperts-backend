import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @IsPublic()
  @ApiTags('login')
  @ApiBody({
    description: 'Credenciais de login',
    examples: {
      example1: {
        value: {
          email: 'admin@example.com',
          password: 'Admin@1234',
        },
      },
    },
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    return this.service.login(req.user);
  }
}
