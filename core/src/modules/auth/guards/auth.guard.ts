import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { RequestInterface } from "../../../common/interfaces/request.interface";
import { Reflector } from "@nestjs/core";

import { IS_PUBLIC_ROUTE } from "../../../common/decorators/public.decorator";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { EnvironmentConfig } from "src/shared/interfaces/config.interface";
import { AccessTokenPayload } from "src/common/interfaces/token.payload.interface";
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
        
        try {
            const request = context.switchToHttp().getRequest() as RequestInterface;
            const accessToken = this.extractBearerToken(request);
            if (!accessToken) {
                throw new UnauthorizedException('Authentication required');
            }
            const accessTokenPayload: AccessTokenPayload = await this.jwtService.verify(accessToken, {
                secret: this.configService.get('JWT_SECRET_KEY'),
            });
            Logger.log(`Authenticated request for user ${accessTokenPayload.email} (ID: ${accessTokenPayload.sub})`, AuthGuard.name);
            return true;
        }
        catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }



    private extractBearerToken(request: RequestInterface): string | null {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }
        return authHeader.split(' ')[1];
    }
}