import { Store } from '@ngxs/store';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LeafletService } from './leaflet.service';

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
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.leafletService.init();
    this.mapResizeObserver = new ResizeObserver(() => this.leafletService.invalidateSize());
    this.mapResizeObserver.observe(this.mapRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.mapResizeObserver.unobserve(this.mapRef.nativeElement);
  }
}
