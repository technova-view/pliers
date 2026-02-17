import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { RequestInterface } from "../../../common/interfaces/request.interface";
import { Reflector } from "@nestjs/core";

import { IS_PUBLIC_ROUTE } from "../../../common/decorators/public.decorator";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EnvironmentConfig } from "src/shared/interfaces/config.interface";
@Injectable()
export class AuthGuard implements CanActivate {


    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<EnvironmentConfig>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublicRoute = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublicRoute) {
            return true;
        }

        // Extract token from request
        const request = context.switchToHttp().getRequest() as RequestInterface;
        const accessToken = this.extractBearerToken(request);
        if (!accessToken) {
            throw new UnauthorizedException('Authentication required');
        }

        const payload = await this.jwtService.verify(accessToken, {
            secret: this.configService.get('JWT_SECRET_KEY'),
        })



        return false;
    }



    private extractBearerToken(request: RequestInterface): string | null {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }
        return authHeader.split(' ')[1];
    }
}