import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('leaflet', { static: false })
  readonly mapRef!: ElementRef<HTMLDivElement>;

  private map!: leaflet.Map;
  private mapResizeObserver!: ResizeObserver;

  constructor() { }

  private initMap(): void {
    this.map = leaflet.map('map', {
      center: [50.450001, 30.523333],
      zoom: 3,
      zoomControl: false
    });

    this.mapResizeObserver = new ResizeObserver(() => this.map.invalidateSize());
    this.mapResizeObserver.observe(this.mapRef.nativeElement);

    const mapControl: leaflet.Control.Zoom = leaflet.control.zoom({
      position: 'topright'
    });
    mapControl.addTo(this.map);

    const mapTiles: leaflet.TileLayer = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    mapTiles.addTo(this.map);

    leaflet.marker([50.4582839,30.6140384]).addTo(this.map);

    this.map.zoomIn(9);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.initMap();
  }

  ngOnDestroy(): void {
      this.mapResizeObserver.unobserve(this.mapRef.nativeElement);
  }
}
