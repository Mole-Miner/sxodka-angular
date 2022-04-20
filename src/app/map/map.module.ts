import { NgxsModule } from '@ngxs/store';
import { LeafletService } from './leaflet.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { Routes, RouterModule } from '@angular/router';
import { MapState } from './map.state';

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
    NgxsModule.forFeature([MapState])
  ],
  providers: [
    LeafletService
  ]
})
export class MapModule { }
