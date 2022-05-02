interface LoginModelSpec {
    email: string;
    password: string;
}

export type LoginModel = Required<Readonly<LoginModelSpec>>;