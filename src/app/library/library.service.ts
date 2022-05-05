import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class LibraryService {
    private readonly mock: any[] = [];

    constructor(private readonly httpClient: HttpClient) {
        for (let i = 0; i < 10; i++) {
            this.mock.push({
                title: `title ${i}`,
                description: `description ${i}`,
                src: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
            });
        }
    }

    findAll(): Observable<any[]> {
        return of(this.mock);
    }

    create(data: any): Observable<any> {
        this.mock.push(data);
        return of(data);
    }

    update(data: any): Observable<any> {
        const find = this.mock.find(item => item.id === data.id);
        const update = Object.assign({}, { ...find, ...data });
        this.mock.splice(this.mock.indexOf(find), 1, update);
        return of(this.mock.find(item => item.id === data.id));
    }

    delete(data: any): Observable<any> {
        const index = this.mock.indexOf(data);
        this.mock.splice(index, 1);
        return of(index);
    }
}