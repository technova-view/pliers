import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { Public } from "../../../common/decorators/public.decorator";
import { SignupDto } from "../dto/signup.dto";
import { LoginDto } from "../dto/login.dto";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { GoogleAuthDto } from "../dto/google-auth.dto";
import { BaseApiResponse } from "../../../common/interfaces/api-response.interface";
import { RefreshAccessTokenResponseDto, LogoutResponseDto } from "../dto/auth-response.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RequestInterface } from "src/common/interfaces/request.interface";

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
        @Req() request: RequestInterface,
    ): Promise<BaseApiResponse<RefreshAccessTokenResponseDto>> {
        return this.authService.refreshAccessToken(refreshTokenDto, request);
    }

    @ApiBearerAuth()
    @Post('logout')
    async logout(
        @Body() refreshTokenDto: RefreshTokenDto,
        @Req() request: RequestInterface,
    ): Promise<BaseApiResponse<LogoutResponseDto>> {
    return this.authService.logout(refreshTokenDto, request);
  }

  @Public()
  @Post('google')
  async googleAuth(@Body() googleAuthDto: GoogleAuthDto, @Req() request: RequestInterface): Promise<BaseApiResponse<{ accessToken: string; refreshToken: string }>> {
    return this.authService.googleAuth(googleAuthDto, request);
  }

}
