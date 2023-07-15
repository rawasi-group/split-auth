import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Token, TokenResponse } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validate(username: string, password: string) {
    const user = await this.userService.getUser(username);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    if (!(await this.validatePassword(user.password, password))) {
      throw new UnauthorizedException('Incorrect password');
    }

    return user;
  }
  validatePassword(user_password: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, user_password || '');
  }
  async login(user: User): Promise<TokenResponse> {
    const payload: Token = {
      id: user.id,
      username: user.user_name,
    };

    let refresh_token: string;

    if (process.env.accessTokenExpiration) {
      refresh_token = await this.jwtService.signAsync(
        payload,
        this.getRefreshTokenOptions(user),
      );
    }

    return {
      access_token: await this.jwtService.signAsync(
        payload,
        this.getAccessTokenOptions(user),
      ),
      refresh_token,
    };
  }
  getAccessTokenOptions(user: User): JwtSignOptions {
    return this.getTokenOptions('access', user);
  }
  getRefreshTokenOptions(user: User): JwtSignOptions {
    return this.getTokenOptions('refresh', user);
  }
  async loginWithRefreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.decode(refreshToken) as Token;

      if (!decoded) {
        throw new Error();
      }

      const user = await this.userService.validateUserById(decoded.id);

      await this.jwtService.verifyAsync<Token>(
        refreshToken,
        this.getRefreshTokenOptions(user),
      );

      return this.login(user);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private getTokenOptions(type: 'refresh' | 'access', user: User) {
    const options: JwtSignOptions = {
      secret: process.env.TokenSecret + user.session_token,
    };

    const expiration = process.env.TokenExpiration;

    if (expiration) {
      options.expiresIn = expiration;
    }

    return options;
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
