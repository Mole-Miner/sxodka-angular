import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  constructor() { }

  getAll(): Observable<any[]> {
    const mock = [];
    for (let i = 0; i < 5; i++) {
      mock.push({
        title: `title ${i}`,
        description: `description ${i}`,
        src: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        lat: 50.4366928,
        lng: 30.4237132
      });
    }
    return of(mock);
  }
}
