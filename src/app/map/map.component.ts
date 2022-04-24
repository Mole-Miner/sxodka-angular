import { catchError, map, Subject, switchMap, tap, mapTo, takeUntil } from 'rxjs';
import { GeolocatioService } from '../shared/service/geolocation.service';
import { Store } from '@ngxs/store';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LeafletService } from './leaflet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LatLngLiteral, Marker } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly _destroy$: Subject<void> = new Subject<void>();

  @ViewChild('leaflet', { static: false })
  readonly mapRef!: ElementRef<HTMLDivElement>;

  private _mapResizeObserver!: ResizeObserver;

  private _latlng!: LatLngLiteral;

  constructor(
    private readonly _leaflet: LeafletService,
    private readonly _geolocation: GeolocatioService,
    private readonly _snackBar: MatSnackBar
  ) { }

  createMarker(): void {
    this._leaflet.createMarker(this._latlng, { draggable: true }).pipe(
      switchMap((marker) => this._leaflet.flyTo(marker.getLatLng()).pipe(mapTo(marker))),
      switchMap((marker) => this._snackBar.open('Drag marker', 'Save').onAction().pipe(mapTo(marker))),
      takeUntil(this._destroy$)
    ).subscribe((marker) => console.log(marker.getLatLng()));
  }

  ngOnInit(): void {
    this._geolocation.getCurrentPosition().pipe(
      map(({ coords }: GeolocationPosition) => ({ lat: coords.latitude, lng: coords.longitude }) as LatLngLiteral)
    ).subscribe((value: LatLngLiteral) => this._latlng = value);
  }

  ngAfterViewInit(): void {
    this._leaflet.init();
    this._mapResizeObserver = new ResizeObserver(() => this._leaflet.invalidateSize());
    this._mapResizeObserver.observe(this.mapRef.nativeElement);
  }

  ngOnDestroy(): void {
    this._mapResizeObserver.unobserve(this.mapRef.nativeElement);
    this._destroy$.next();
    this._destroy$.complete();
  }
}