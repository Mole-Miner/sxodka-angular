import { catchError, Subject } from 'rxjs';
import { GeolocatioService } from '../shared/service/geolocation.service';
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
    private readonly leaflet: LeafletService,
    private readonly geolocation: GeolocatioService
  ) { }

  ngOnInit(): void {
    this.geolocation.getCurrentPosition().subscribe({
      next: (position: GeolocationPosition) => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        this.leaflet.createMarker([latitude, longitude]);
        this.leaflet.flyTo([latitude, longitude]);
      },
      error: (error: GeolocationPositionError) => console.log(error)
    });
  }

  ngAfterViewInit(): void {
    this.leaflet.init();
    this.mapResizeObserver = new ResizeObserver(() => this.leaflet.invalidateSize());
    this.mapResizeObserver.observe(this.mapRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.mapResizeObserver.unobserve(this.mapRef.nativeElement);
  }
}