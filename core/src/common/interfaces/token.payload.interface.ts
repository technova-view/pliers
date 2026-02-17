export interface AccessTokenPayload {
    sub: string;
    email: string;
    userType: string;
}

export interface RefreshTokenPayload {
    sessionId: string;
    sub: string;
    email: string;
    userType: string;
}