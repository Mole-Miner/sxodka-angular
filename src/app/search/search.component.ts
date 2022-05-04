import { Router } from '@angular/router';
import { filter, map, Observable, of, pairwise, tap, throttleTime, switchMap, share, Subject, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
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
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  @ViewChild('scroller', { static: false })
  readonly scroller!: CdkVirtualScrollViewport;

  @Select(SearchState.items)
  readonly search$!: Observable<any[]>;

  loading = false;

  constructor(
    private readonly store: Store,
    private readonly geolocation: GeolocatioService,
    private readonly router: Router
  ) { }

  openPostOnMap(post: any): void {
    this.router.navigate(['map'], { state: post });
  }

  ngOnInit(): void {
    this.store.dispatch(new SearchAction.FindAll());
  }

  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 50)),
      throttleTime(200),
      switchMap(() => this.store.dispatch(new SearchAction.FindAll())),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
