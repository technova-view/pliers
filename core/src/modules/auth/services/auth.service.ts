import { Injectable, Inject, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthService {

    constructor() {}

    async signup(): Promise<void> { 
    }
    
    async login(): Promise<void> {
    }
}