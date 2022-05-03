import { filter, map, Observable, of, pairwise, tap, throttleTime, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { SearchAction } from './search.action';
import { SearchState } from './search.state';
import { GeolocatioService } from '@shared';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('scroller', { static: false })
  readonly scroller!: CdkVirtualScrollViewport;

  @Select(SearchState.items)
  readonly search$!: Observable<any[]>;

  loading = false;

  constructor(
    private readonly store: Store,
    private readonly geolocation: GeolocatioService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new SearchAction.FindAll());
  }

  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 50)),
      throttleTime(200),
      switchMap(() => this.store.dispatch(new SearchAction.FindAll()))
    ).subscribe(() => {
      console.log('need to load');
    });
  }
}
