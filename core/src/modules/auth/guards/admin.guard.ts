import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserType } from "../../../common/enums/user-type.enum";
import { RequestInterface } from "src/common/interfaces/request.interface";

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as RequestInterface;
        const user = request.user;

        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }

        if (user.userType !== UserType.PLATFORM_ADMIN) {
            throw new ForbiddenException('Admin access required');
        }

        return true;
    }
}
