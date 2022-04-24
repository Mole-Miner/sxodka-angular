import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  constructor() { }

  getAll(): Observable<any[]> {
    const mock = [];
    for (let i = 0; i < 40; i++) {
      mock.push({
        title: `title ${i}`,
        description: `description ${i}`
      });
    }
    return of(mock);
  }
}
