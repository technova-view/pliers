import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { Public } from "../../../common/decorators/public.decorator";
import type { RequestInterface } from "../../../common/interfaces/request.interface";
import { SignupDto } from "../dto/signup.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @Post('signup')
    async signup(@Body() signupDto: SignupDto, @Req() request: RequestInterface): Promise<void> {
        return this.authService.signup(signupDto, request);
    }

    @Public()
    @Post('login')
    async login(): Promise<void> {
        return this.authService.login();
    }

}
