interface ISignup {
    name: string;
    lastname: string;
    email: string;
    password: string; 
}

export type Signup = Readonly<ISignup>;