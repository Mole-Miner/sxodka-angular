interface SignupModelSpec {
    name: string;
    lastname: string;
    email: string;
    password: string; 
}

export type SignupModel = Readonly<SignupModelSpec>;