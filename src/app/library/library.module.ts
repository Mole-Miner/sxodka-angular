import { NgxsModule } from '@ngxs/store';
import { LibraryService } from './library.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { AngularMaterial } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibraryState } from './library.state';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent
  }
];


@NgModule({
  declarations: [
    LibraryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterial,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([LibraryState])
  ],
  providers: [LibraryService]
})
export class LibraryModule { }
