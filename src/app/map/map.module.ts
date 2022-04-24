import { GeolocatioService } from '../shared/service/geolocation.service';
import { LeafletService } from './leaflet.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: MapComponent
  }
];

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    LeafletService,
    GeolocatioService
  ]
})
export class MapModule { }
