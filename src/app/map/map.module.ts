import { AngularMaterial } from '@shared';
import { GeolocatioService } from '../shared/service/geolocation.service';
import { LeafletService } from './leaflet.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { Routes, RouterModule } from '@angular/router';
import { MapSnackBarComponent } from './map-snack-bar/map-snack-bar.component';

export const routes: Routes = [
  {
    path: '',
    component: MapComponent
  }
];

@NgModule({
  declarations: [
    MapComponent,
    MapSnackBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterial
  ],
  providers: [
    LeafletService,
    GeolocatioService
  ]
})
export class MapModule { }
