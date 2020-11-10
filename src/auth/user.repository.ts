import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { hash, genSalt } from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(credentials: AuthCredentialsDTO): Promise<void> {
    const { username, password } = credentials;
    const user = new User();
    user.username = username;
    user.salt = await genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username Already Exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async validateUserPassword(credentials: AuthCredentialsDTO): Promise<string> {
    const { username, password } = credentials;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }
}