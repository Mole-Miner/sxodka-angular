import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { JwtTokenModel } from '../model/jwt.model';
import { AuthAction } from '../action/auth.action';

interface AuthStateModel {
    token: JwtTokenModel | null;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: null
    }
})
@Injectable()
export class AuthState {
    @Selector()
    static accessToken(state: AuthStateModel): string | null {
        return state.token?.access ?? null;
    }

    @Selector()
    static refreshToken(state: AuthStateModel): string | null {
        return state.token?.refresh ?? null;
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return !!state.token;
    }

    constructor(private readonly authService: AuthService) { }

    @Action(AuthAction.Signin)
    signin(ctx: StateContext<AuthStateModel>, action: AuthAction.Signin) {
        return this.authService.signin(action.payload)
    }
}
