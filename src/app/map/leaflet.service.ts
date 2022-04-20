import { Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Map, Control, TileLayer, Marker, LatLng, LatLngExpression } from 'leaflet';

@Injectable()
export class LeafletService {
    private map!: Map;

    init(): void {
        if (!this.map) {
            this.map = new Map('map', {
                center: [50.450001, 30.523333],
                zoom: 3,
                zoomControl: false
            });
        }
        this.controlZoom();
        this.tileLayer();
        this.zoomIn(9);
    }

    private controlZoom(): void {
        new Control.Zoom({ position: 'topright' }).addTo(this.map);
    }

    private tileLayer(): void {
        new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
    }
    
    private _createMarker(latlng: LatLngExpression): Marker {
        return new Marker(latlng).addTo(this.map);
    }

    createMarker(latlng: LatLngExpression): Observable<Marker> {
        return of(new Marker(latlng)).pipe(
            tap((marker) => marker.addTo(this.map))
        )
    }

    zoomIn(delta?: number): void {
        this.map.zoomIn(delta);
    }

    invalidateSize(): void {
        this.map.invalidateSize();
    }
}