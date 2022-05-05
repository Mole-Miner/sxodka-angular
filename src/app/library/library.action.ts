export namespace LibraryAction {
    export class FindAll {
        static readonly type = '[Library] FindAll';
    }
    export class Create {
        static readonly type = '[Library] Create';
        constructor(readonly pyaload: any) {}
    }
    export class Update {
        static readonly type = '[Library] Update';
    }
    export class Remove {
        static readonly type = '[Library] Remove';
    }
}