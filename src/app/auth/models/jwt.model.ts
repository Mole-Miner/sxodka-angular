interface JwtTokenSpec {
    access: string;
    refresh: string;
}

export type JwtToken = Readonly<JwtTokenSpec>;