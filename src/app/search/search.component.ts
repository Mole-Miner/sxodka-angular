import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { SearchAction } from './search.action';
import { SearchState } from './search.state';
import { GeolocatioService } from '@shared';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @Select(SearchState.items)
  readonly search$!: Observable<any[]>;

  constructor(
    private readonly store: Store,
    private readonly geolocation: GeolocatioService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new SearchAction.GetAll());
  }
}
