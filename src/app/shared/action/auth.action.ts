import { SignupModel } from '../model/signup.model';
import { SigninModel } from '../model/signin.model';

export namespace AuthAction {
    export class Signin {
        static readonly type = '[Auth] Signin';
        constructor(readonly payload: SigninModel) {}
    }

    export class Signup {
        static readonly type = '[Auth] Signup';
        constructor(readonly payload: SignupModel) {}
    }

    export class Signout {
        static readonly type = '[Auth] Signout';
    }
}