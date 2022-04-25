import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { LatLngExpression, LatLngLiteral } from 'leaflet';

@Component({
  selector: 'app-map-snack-bar',
  templateUrl: './map-snack-bar.component.html',
  styleUrls: ['./map-snack-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapSnackBarComponent implements OnInit {

  constructor(private readonly _shackBarRef: MatSnackBarRef<MapSnackBarComponent>) { }

  ngOnInit(): void {
  }

  dissmiss(): void {
    this._shackBarRef.dismiss();
  }

  dissmissWithAction(): void {
    this._shackBarRef.dismissWithAction();
  }
}
