interface SignupSpec {
    name: string;
    lastname: string;
    email: string;
    password: string; 
}

export type Signup = Readonly<SignupSpec>;