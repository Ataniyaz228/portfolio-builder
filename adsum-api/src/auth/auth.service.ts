import { Injectable, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    this.logger.log(`Validating user: ${username}`);
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password_hash)) {
      this.logger.log(`User ${username} validated successfully`);
      const { password_hash, ...result } = user;
      return result;
    }
    this.logger.warn(`Validation failed for user: ${username}`);
    return null;
  }

  async login(user: any) {
    this.logger.log(`Generating token for user: ${user.username}`);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: any) {
    this.logger.log(`Registering new user: ${data.username}`);
    const existing = await this.usersService.findByUsername(data.username);
    if (existing) {
      this.logger.warn(`Registration failed: Username ${data.username} already taken`);
      throw new ConflictException('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    try {
      const user = await this.usersService.create({
        username: data.username,
        email: data.email,
        password_hash: hashedPassword,
        full_name: data.full_name || '',
      });

      this.logger.log(`User ${data.username} registered successfully with ID: ${user.id}`);
      const { password_hash, ...result } = user;
      return result;
    } catch (error) {
      this.logger.error(`Error during registration for ${data.username}: ${error.message}`);
      throw error;
    }
  }
}
