import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [CommonModule],
    exports: [
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSidenavModule,
        MatSelectModule
    ]
})
export class AngularMaterial { }