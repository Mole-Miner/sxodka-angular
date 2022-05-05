import { LibraryService } from './library.service';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LibraryAction } from "./library.action";
import { tap } from 'rxjs';

interface LibraryStateModel {
    items: any[];
}

@State<LibraryStateModel>({
    name: 'library',
    defaults: {
        items: []
    }
})
@Injectable()
export class LibraryState {
    constructor(private readonly libraryService: LibraryService) { }

    @Selector()
    static items(state: LibraryStateModel) {
        return state.items;
    }

    @Action(LibraryAction.FindAll)
    findAll({ setState }: StateContext<LibraryStateModel>) {
        return this.libraryService.findAll().pipe(
            tap((response) => setState({
                items: [...response]
            }))
        );
    }

    @Action(LibraryAction.Create)
    create({ patchState, getState }: StateContext<LibraryStateModel>, { pyaload }: LibraryAction.Create) {
        return this.libraryService.create(pyaload).pipe(
            tap((response) => patchState({
                items: [response, ...getState().items]
            }))
        )
    }


    @Action(LibraryAction.Create)
    update({ setState, getState }: StateContext<LibraryStateModel>, { pyaload }: LibraryAction.Create) {
        return this.libraryService.update(pyaload).pipe(
            tap((response) => {
                const { items } = getState();
                items.splice(items.indexOf(items.find((item) => item.id === response.id)), 1, response);
                setState({ items });
            })
        )
    }


    @Action(LibraryAction.Create)
    remove({ setState, getState }: StateContext<LibraryStateModel>, { pyaload }: LibraryAction.Create) {
        return this.libraryService.delete(pyaload).pipe(
            tap(() => {
                const { items } = getState();
                items.splice(items.indexOf(items.find((item) => item.id === pyaload.id)));
                setState({ items })
            })
        )
    }
}