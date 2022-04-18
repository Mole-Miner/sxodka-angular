import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { SearchAction } from './search.action';
import { SearchState } from './search.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @Select(SearchState.items)
  readonly search$!: Observable<any[]>;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new SearchAction.GetAll());
  }
}
