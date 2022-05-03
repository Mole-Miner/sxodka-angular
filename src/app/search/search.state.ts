import { Injectable } from '@angular/core';
import { Action, createSelector, Select, Selector, State, StateContext } from '@ngxs/store';
import { tap, Observable } from 'rxjs';

import { SearchAction } from './search.action';
import { SearchService } from './search.service';

export interface SearchStateModel {
    items: any[];
}

@State<SearchStateModel>({
    name: 'search',
    defaults: {
        items: []
    }
})
@Injectable()
export class SearchState {
    @Selector()
    static items(state: SearchStateModel): any[] {
        return state.items;
    }

    constructor(private readonly searchService: SearchService) { }

    @Action(SearchAction.GetAll)
    getAll({ setState }: StateContext<SearchStateModel>) {
        return this.searchService.getAll().pipe(
            tap(response => setState({
                items: response
            }))
        );
    }

    @Action(SearchAction.FindAll)
    findAll({ patchState, getState }: StateContext<SearchStateModel>): Observable<any[]> {
        return this.searchService.getAll().pipe(
            tap((response) => {
                const { items } = getState();
                return patchState({
                    items: [...items, ...response]
                })
            })
        )
    }
}