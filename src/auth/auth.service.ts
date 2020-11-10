import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async signUp(credentials: AuthCredentialsDTO): Promise<void> {
    return await this.userRepository.signUp(credentials);
  }
  async signIn(credentials: AuthCredentialsDTO) {
    const username = await this.userRepository.validateUserPassword(
      credentials,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials ');
    }
  }
}
