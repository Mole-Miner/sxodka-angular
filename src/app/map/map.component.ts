import { Store } from '@ngxs/store';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LeafletService } from './leaflet.service';
import { MapAction } from './map.action';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('leaflet', { static: false })
  readonly mapRef!: ElementRef<HTMLDivElement>;

  private mapResizeObserver!: ResizeObserver;

  constructor(
    private readonly leafletService: LeafletService,
    private readonly store: Store,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.leafletService.init();
    this.mapResizeObserver = new ResizeObserver(() => this.leafletService.invalidateSize());
    this.mapResizeObserver.observe(this.mapRef.nativeElement);
  }

  createMarker(): void {
    this.leafletService.createMarker([50.450001, 30.523333]).subscribe();
    // this.store.dispatch(new MapAction.CreateMarker([50.450001, 30.523333])).subscribe(() => {
    //   this.cdr.detectChanges();
    // });
  }

  ngOnDestroy(): void {
    this.mapResizeObserver.unobserve(this.mapRef.nativeElement);
  }
}
