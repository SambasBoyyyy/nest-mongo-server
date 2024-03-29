import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/module/user/user.service';
import { ConfigService } from '@nestjs/config';
import { SignupUserDto } from './dto/create_user-dto';
import * as argon2 from 'argon2';
import { LoginUserDto } from './dto/login_user_dto';
@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
      ) {}
      async signUp(createUserDto: SignupUserDto): Promise<any> {
        // Check if user exists
        const userExists = await this.usersService.findByUserEmail(
          createUserDto.email,
        );
        if (userExists) {
          throw new BadRequestException('User already exists');
        }
    
        // Hash password
        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.usersService.create({
          ...createUserDto,
          password: hash,
        });
        console.log(newUser.userId)
        const tokens = await this.getTokens(newUser.userId, newUser.email);
      await this.updateRefreshToken(newUser.userId, tokens.refreshToken);
        return tokens;
      }
    
        async signIn(data: LoginUserDto) {
        // Check if user exists
        const user = await this.usersService.findByUserEmail(data.email);
        if (!user) throw new BadRequestException('User does not exist');
        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches)
          throw new BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user.userId, user.email);
        await this.updateRefreshToken(user.userId, tokens.refreshToken);
        return tokens;
      }
    
        async logout(userId: string) {
        return this.usersService.update(userId, { refreshToken: null });
      }
    
      hashData(data: string) {
        return argon2.hash(data);
      }
    
      async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userId, {
            refreshToken: hashedRefreshToken,
        
        });
      }
    
      async getTokens(userId: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
            {
              sub: userId,
              email,
            },
            {
              secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
              expiresIn: '15m',
            },
          ),
          this.jwtService.signAsync(
            {
              sub: userId,
              email,
            },
            {
              secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: '7d',
            },
          ),
        ]);
    
        return {
          accessToken,
          refreshToken,
        };
      }

      async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshToken)
          throw new ForbiddenException('Access Denied');
        const refreshTokenMatches = await argon2.verify(
          user.refreshToken,
          refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
      }

}
