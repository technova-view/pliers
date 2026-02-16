import { Injectable } from '@nestjs/common';
import { SignupDto } from '../dto/signup.dto';
import { RequestInterface } from '../../../common/interfaces/request.interface';

@Injectable()
export class AuthService {
    constructor() {}
    async signup(signupDto: SignupDto, request: RequestInterface): Promise<void> { 
    }
    async login(): Promise<void> {
    }
}