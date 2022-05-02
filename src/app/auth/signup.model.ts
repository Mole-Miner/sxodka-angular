interface SignupModelSpec {
    email: string;
    password: string;
    firtname: string;
    lastname: string;
}

export type SignupModel = Required<Readonly<SignupModelSpec>>;