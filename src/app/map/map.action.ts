export namespace MapAction {
    export class CreateMarker {
        static readonly type = '[Map] Create Marker';
        constructor(readonly payload: any) { }
    }
    export class RemoveMarker {
        static readonly type = '[Map] Remove Marker';
        constructor(readonly payload: any) { }
    }
}