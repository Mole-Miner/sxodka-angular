interface IJwtTokens {
    access: string;
    refresh: string;
}

export type JwtTokens = Readonly<IJwtTokens>;