interface SigninModelSpec {
    email: string;
    password: string;
}

export type SigninModel = Readonly<SigninModelSpec>;