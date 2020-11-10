import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) credentials: AuthCredentialsDTO,
  ): Promise<void> {
    await this.authService.signUp(credentials);
  }
  @Post('signin')
  async signIn(
    @Body(ValidationPipe) credentials: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(credentials);
  }
}
