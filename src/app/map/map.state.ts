import { tap } from 'rxjs';
import { LeafletService } from './leaflet.service';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { MapAction } from './map.action';

export interface MapStateModel {
    markeks: any[];
}

@State<MapStateModel>({
    name: 'map',
    defaults: {
        markeks: []
    }
})
@Injectable()
export class MapState {
    @Selector()
    static markerks(state: MapStateModel) {
        return state.markeks;
    }

    constructor(private readonly leafletService: LeafletService) { }

    // @Action(MapAction.CreateMarker)
    // createMarker({ setState, getState }: StateContext<MapStateModel>, { payload }: MapAction.CreateMarker) {
    //     return this.leafletService.createMarker(payload).pipe(
    //         tap((marker) => setState({ markeks: [marker, ...getState().markeks] }))
    //     );
    // }
}