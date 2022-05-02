import { SignupModel } from './signup.model';
import { LoginModel } from './login.model';

export namespace AuthAction {
    export class Login {
        static readonly type = '[Auth] Login';
        constructor(readonly payload: LoginModel) { }
    }
    export class Signup {
       static readonly type = '[Auth] Signup';
       constructor(readonly payload: SignupModel) { }
    }
    export class Logout {
        static readonly type = '[Auth] Logout';
    }
}