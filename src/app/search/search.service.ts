import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  constructor() { }

  getAll(): Observable<any[]> {
    return of([
      {
        title: 'first',
        description: `it's first post`
      },
      {
        title: 'second',
        description: `it's second post`
      }
    ]);
  }
}
