export namespace SearchAction {
    export class GetAll {
        static readonly type = '[Search] Get All';
    }
    export class FindAll {
        static readonly type = '[Search] Find All';
        constructor(readonly paylod?: any) { }
    }
}