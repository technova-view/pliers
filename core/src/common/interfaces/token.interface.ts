import { UserType } from "../enums/user-type.enum";

export interface AccessTokenPayload {
    sub: string;
    email: string;
    userType: UserType;
}

export interface RefreshTokenPayload {
    sessionId: string;
    sub: string;
    email: string;
    userType: UserType;
}