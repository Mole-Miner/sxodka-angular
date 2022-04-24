import { mapTo, Observable, of, tap, catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Map, Control, TileLayer, Marker, LatLng, LatLngExpression, LeafletEvent, MarkerOptions, ZoomPanOptions, Layer } from 'leaflet';

@Injectable()
export class LeafletService {
    private _map!: Map;

    private _createMap(): void {
        this._map = new Map('map', {
            center: [50.450001, 30.523333],
            zoom: 3,
            zoomControl: false
        });
    }

    private _controlZoom(): void {
        new Control.Zoom({ position: 'topright' }).addTo(this._map);
    }

    private _tileLayer(): void {
        new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this._map);
    }

    removeLayer<T extends Layer>(layer: T): Observable<T> {
        return of(this._map.removeLayer(layer)).pipe(mapTo(layer));
    }

    flyTo(latlng: LatLngExpression, zoom?: number, options?: ZoomPanOptions): Observable<LatLngExpression> {
        return of(this._map.flyTo(latlng, zoom, options)).pipe(mapTo(latlng));
    }

    createMarker<T>(latlng: LatLngExpression, options?: MarkerOptions): Observable<Marker<T>> {
        return of(new Marker(latlng, options)).pipe(tap((marker: Marker) => marker.addTo(this._map)));
    }

    zoomIn(delta?: number): void {
        this._map.zoomIn(delta);
    }

    invalidateSize(): void {
        this._map.invalidateSize();
    }

    init(): void {
        this._createMap();
        this._controlZoom();
        this._tileLayer();
        this.zoomIn(9);
    }
}