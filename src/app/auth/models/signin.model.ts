interface SigninSpec {
    email: string;
    password: string;
}

export type Signin = Readonly<SigninSpec>;