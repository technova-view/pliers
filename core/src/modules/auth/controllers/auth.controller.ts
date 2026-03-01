import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { Public } from "../../../common/decorators/public.decorator";
import { SignupDto } from "../dto/signup.dto";
import { LoginDto } from "../dto/login.dto";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { GoogleAuthDto } from "../dto/google-auth.dto";
import { ForgotPasswordDto } from "../dto/forgot-password.dto";
import { VerifyOtpDto } from "../dto/verify-otp.dto";
import { ResetPasswordDto } from "../dto/reset-password.dto";
import { BaseApiResponse } from "../../../common/interfaces/api-response.interface";
import { RefreshAccessTokenResponseDto, LogoutResponseDto } from "../dto/auth-response.dto";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @Post('signup')
    async signup(@Body() signupDto: SignupDto): Promise<BaseApiResponse<{ userId: string }>> {
        return this.authService.signup(signupDto);
    }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<BaseApiResponse<{ accessToken: string; refreshToken: string }>> {
        return this.authService.login(loginDto);
    }

    @Public()
    @Post('refresh')
    async refreshAccessToken(
        @Body() refreshTokenDto: RefreshTokenDto
    ): Promise<BaseApiResponse<RefreshAccessTokenResponseDto>> {
        return this.authService.refreshAccessToken(refreshTokenDto);
    }

    @ApiBearerAuth()
    @Post('logout')
    async logout(
        @Body() refreshTokenDto: RefreshTokenDto
    ): Promise<BaseApiResponse<LogoutResponseDto>> {
    return this.authService.logout(refreshTokenDto);
  }

  @Public()
  @Post('google')
  async googleAuth(@Body() googleAuthDto: GoogleAuthDto): Promise<BaseApiResponse<{ accessToken: string; refreshToken: string }>> {
    return this.authService.googleAuth(googleAuthDto);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<BaseApiResponse<{ message: string }>> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Public()
  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<BaseApiResponse<{ valid: boolean }>> {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<BaseApiResponse<{ message: string }>> {
    return this.authService.resetPassword(resetPasswordDto);
  }

}
