import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { IS_PUBLIC_ROUTE } from "../../../common/decorators/public.decorator";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EnvironmentConfig } from "src/common/interfaces/config.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../database/entities/user.entity";
import { RequestInterface } from "src/common/interfaces/request.interface";
import { AccessTokenPayload } from "src/common/interfaces/token.interface";
import { Request } from "express";
@Injectable()
export class AuthGuard implements CanActivate {


    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<EnvironmentConfig>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublicRoute = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublicRoute) {
            return true;
        }

        try {
            const request = context.switchToHttp().getRequest() as RequestInterface;
            const accessToken = this.extractBearerToken(request);
            if (!accessToken) {
                throw new UnauthorizedException('Authentication required');
            }
            const accessTokenPayload: AccessTokenPayload = await this.jwtService.verify(accessToken, {
                secret: this.configService.get('JWT_SECRET_KEY'),
            });
            
            // Fetch user from database and inject into request
            const user = await this.userRepository.findOne({ where: { id: accessTokenPayload.sub } });
            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            request.user = user;
            return true;
        }
        catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }



    private extractBearerToken(request: Request): string | null {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }
        return authHeader.split(' ')[1];
    }
}