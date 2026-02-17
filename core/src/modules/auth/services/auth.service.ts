import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../dto/signup.dto';
import { RequestInterface } from '../../../common/interfaces/request.interface';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { User } from '../../database/entities/user.entity';
import { UserSession } from '../../database/entities/user-session.entity';
import { BaseApiResponse } from '../../../shared/interfaces/api-response.interface';
import { EnvironmentConfig } from '../../../shared/interfaces/config.interface';
import { RefreshAccessTokenResponseDto, LogoutResponseDto } from '../dto/auth-response.dto';
import { UserType } from '../../../common/enums/user-type.enum';
import { AccessTokenPayload, RefreshTokenPayload } from 'src/common/interfaces/token.payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserSession)
        private readonly userSessionRepository: Repository<UserSession>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<EnvironmentConfig>,
    ) { }

    /**
     * Signup a new user
     * @param signupDto - Signup data
     * @param request - Request object
     */
    async signup(signupDto: SignupDto, request: RequestInterface): Promise<BaseApiResponse<{ userId: string }>> {
        const { email, password, firstName, lastName } = signupDto;

        // Check if user already exists
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            return BaseApiResponse.error('User with this email already exists');
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const user = this.userRepository.create({
            email,
            passwordHash,
            firstName,
            lastName,
            provider: 'email',
            accountVerified: false,
            userType: UserType.CONTRACTOR,
        });

        const savedUser = await this.userRepository.save(user);

        return BaseApiResponse.success('User created successfully', { userId: savedUser.id });
    }

    /**
     * Login a user
     * @param loginDto - Login data
     * @param request - Request object
     */
    async login(loginDto: LoginDto, request: RequestInterface): Promise<BaseApiResponse<{ accessToken: string; refreshToken: string }>> {
        const { email, password } = loginDto;

        // Find user
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return BaseApiResponse.error('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return BaseApiResponse.error('Invalid credentials');
        }

        // Generate tokens
        // const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        const session = this.userSessionRepository.create({
            user: { id: user.id } as User,
            expiresAt,
        });
        const tokens = await this.generateTokens(user, session);

        session.refreshTokenHash = await bcrypt.hash(tokens.refreshToken, 10);
        await this.userSessionRepository.save(session);

        return BaseApiResponse.success('Login successful', {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    }

    /**
     * Refresh a user's accessToken token
     * @param refreshTokenDto - Refresh token data
     */
    async refreshAccessToken(refreshTokenDto: RefreshTokenDto): Promise<BaseApiResponse<RefreshAccessTokenResponseDto>> {
        const { refreshToken } = refreshTokenDto;

        try {
            // Verify refresh token
            const payload: RefreshTokenPayload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
            });

            // Find session
            const session = await this.userSessionRepository.findOne({
                where: { id: payload.sessionId, user: { id: payload.sub } },
                relations: ['user'],
            });

            if (!session || session.revokedAt || session.expiresAt < new Date()) {
                return BaseApiResponse.error('Invalid or expired refresh token');
            }

            const accessTokenPayload: AccessTokenPayload = { sub: payload.sub, email: payload.email, userType: payload.userType };
            // Generate new access token
            const newAccessToken = await this.jwtService.signAsync(
                accessTokenPayload,
                {
                    secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
                    expiresIn: this.configService.getOrThrow('JWT_EXPIRES_IN'),
                }
            );

            return BaseApiResponse.success('Access token refreshed successfully', {
                accessToken: newAccessToken,
            });
        } catch (error) {
            return BaseApiResponse.error('Invalid or expired refresh token');
        }
    }

    /**
     * Logout a user
     * @param refreshTokenDto - Refresh token to revoke
     */
    async logout(refreshTokenDto: RefreshTokenDto): Promise<BaseApiResponse<LogoutResponseDto>> {
        const { refreshToken } = refreshTokenDto;

        try {
            // Verify refresh token
            const payload: RefreshTokenPayload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
            });

            // Revoke session
            await this.userSessionRepository.update(
                { id: payload.sessionId },
                { revokedAt: new Date() }
            );

            return BaseApiResponse.success('Logout successful', { loggedOut: true });
        } catch (error) {
            return BaseApiResponse.error('Invalid refresh token');
        }
    }

    /**
     * Generate access and refresh tokens
     * @param user - User entity
     */
    private async generateTokens(user: User, session: UserSession): Promise<{ accessToken: string; refreshToken: string }> {
        const accessTokenPayload: AccessTokenPayload = { sub: user.id, email: user.email, userType: user.userType };
        const refreshTokenPayload: RefreshTokenPayload = { sessionId: session.id, sub: user.id, email: user.email, userType: user.userType };
        const accessToken = await this.jwtService.signAsync(accessTokenPayload);
        const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
            secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }
}
