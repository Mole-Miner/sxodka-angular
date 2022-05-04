import { MapSnackBarComponent } from './map-snack-bar/map-snack-bar.component';
import { catchError, map, Subject, switchMap, tap, mapTo, takeUntil, iif, of, NEVER } from 'rxjs';
import { GeolocatioService } from '../shared/service/geolocation.service';
import { Store } from '@ngxs/store';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LeafletService } from './leaflet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Icon, LatLngLiteral, Layer, Marker } from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();

  @ViewChild('leaflet', { static: false })
  readonly mapRef!: ElementRef<HTMLDivElement>;

  private mapResizeObserver!: ResizeObserver;

  private latlng!: LatLngLiteral;

  constructor(
    private readonly leaflet: LeafletService,
    private readonly geolocation: GeolocatioService,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location,
    private readonly cdr: ChangeDetectorRef
  ) { }

  createMarker(): void {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    this.leaflet.createMarker(this.latlng, {
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
      switchMap((marker) => this.leaflet.flyTo(marker.getLatLng()).pipe(
        switchMap((latlng) => this.snackBar.openFromComponent(MapSnackBarComponent).afterDismissed().pipe(
          tap(() => marker.dragging?.disable()),
          switchMap(({ dismissedByAction }) => dismissedByAction ? of(latlng) : this.leaflet.removeLayer<Marker>(marker))
        )),
      )),
      takeUntil(this.destroy$)
    ).subscribe((value) => console.log(value));
  }

  private onGeolocation(): void {
    this.geolocation.getCurrentPosition().pipe(
      map(({ coords }: GeolocationPosition) => ({ lat: coords.latitude, lng: coords.longitude }) as LatLngLiteral)
    ).subscribe((value: LatLngLiteral) => this.latlng = value);
  }

  private onPost(): void {
    const post: any = this.location.getState();
    if (!post.src) {
      return;
    }

    const { lat, lng, src } = post;
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    this.leaflet.createMarker([lat, lng], {
      draggable: false,
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
    }).subscribe(() => console.log('created'));
    
    // this.leaflet.createMarker([lat, lng], {
    //   draggable: false,
    //   icon: new Icon({
    //     iconUrl: src,
    //     iconSize: [25, 41],
    //     iconAnchor: [12, 41],
    //     popupAnchor: [1, -34],
    //     tooltipAnchor: [16, -28],
    //     shadowSize: [41, 41]
    //   })
    // }).subscribe(() => console.log('created'));
  }

  ngOnInit(): void {
    this.onGeolocation();
  }

  ngAfterViewInit(): void {
    this.leaflet.init();
    this.mapResizeObserver = new ResizeObserver(() => this.leaflet.invalidateSize());
    this.mapResizeObserver.observe(this.mapRef.nativeElement);
    this.onPost();
  }

  ngOnDestroy(): void {
    this.mapResizeObserver.unobserve(this.mapRef.nativeElement);
    this.destroy$.next();
    this.destroy$.complete();
  }
}