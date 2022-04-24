import { SearchService } from './search.service';
import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';
import { SearchState } from './search.state';
import { GeolocatioService } from '@shared';

export const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  }
];

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([SearchState])
  ],
  providers: [SearchService, GeolocatioService]
})
export class SearchModule { }
