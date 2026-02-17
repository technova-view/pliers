import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { Public } from "../../../common/decorators/public.decorator";
import type { RequestInterface } from "../../../common/interfaces/request.interface";
import { SignupDto } from "../dto/signup.dto";
import { LoginDto } from "../dto/login.dto";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { BaseApiResponse } from "../../../shared/interfaces/api-response.interface";
import { RefreshAccessTokenResponseDto, LogoutResponseDto } from "../dto/auth-response.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @Post('signup')
    async signup(@Body() signupDto: SignupDto, @Req() request: RequestInterface): Promise<BaseApiResponse<{ userId: string }>> {
        return this.authService.signup(signupDto, request);
    }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Req() request: RequestInterface): Promise<BaseApiResponse<{ accessToken: string; refreshToken: string }>> {
        return this.authService.login(loginDto, request);
    }

    @Public()
    @Post('refresh')
    async refreshAccessToken(
        @Body() refreshTokenDto: RefreshTokenDto,
    ): Promise<BaseApiResponse<RefreshAccessTokenResponseDto>> {
        return this.authService.refreshAccessToken(refreshTokenDto);
    }

    @Public()
    @Post('logout')
    async logout(
        @Body() refreshTokenDto: RefreshTokenDto,
    ): Promise<BaseApiResponse<LogoutResponseDto>> {
        return this.authService.logout(refreshTokenDto);
    }

}
