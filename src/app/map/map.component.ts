import { MapSnackBarComponent } from './map-snack-bar/map-snack-bar.component';
import { catchError, map, Subject, switchMap, tap, mapTo, takeUntil, iif, of, NEVER } from 'rxjs';
import { GeolocatioService } from '../shared/service/geolocation.service';
import { Store } from '@ngxs/store';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LeafletService } from './leaflet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Icon, LatLngLiteral, Layer, Marker } from 'leaflet';

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
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    this._leaflet.createMarker(this._latlng, {
      draggable: true,
      icon: new Icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      })
    }).pipe(
      switchMap((marker) => this._leaflet.flyTo(marker.getLatLng()).pipe(
        switchMap((latlng) => this._snackBar.openFromComponent(MapSnackBarComponent).afterDismissed().pipe(
          tap(() => marker.dragging?.disable()),
          switchMap(({ dismissedByAction }) => dismissedByAction ? of(latlng) : this._leaflet.removeLayer<Marker>(marker))
        )),
      )),
      takeUntil(this._destroy$)
    ).subscribe((value) => console.log(value));
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