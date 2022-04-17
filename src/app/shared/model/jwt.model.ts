interface JwtTokenModelSpec {
    access: string;
    refresh: string;
}

export type JwtTokenModel = Readonly<JwtTokenModelSpec>;