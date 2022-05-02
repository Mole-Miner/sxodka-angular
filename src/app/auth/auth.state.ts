import { Observable, tap } from 'rxjs';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthAction } from "./auth.action";
import { AuthService } from "./auth.service";

interface AuthStateModel {
    token: string | null;
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
    static token(state: AuthStateModel): string | null {
        return state.token;
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return !!state.token;
    }

    constructor(private readonly authService: AuthService) { }

    @Action(AuthAction.Login)
    login({ patchState }: StateContext<AuthStateModel>, { payload }: AuthAction.Login): Observable<any> {
        return this.authService.login(payload).pipe(
            tap(({ token }) => patchState({ token }))
        );
    }

    @Action(AuthAction.Signup)
    signup({ patchState }: StateContext<AuthStateModel>, { payload }: AuthAction.Signup): Observable<any> {
        return this.authService.signup(payload).pipe(
            tap(({ token }) => patchState({ token }))
        );
    }

    @Action(AuthAction.Login)
    logout({ setState }: StateContext<AuthStateModel>): Observable<any> {
        return this.authService.logout().pipe(
            tap(() => setState({ token: null }))
        );
    }
}