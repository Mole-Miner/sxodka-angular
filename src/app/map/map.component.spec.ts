import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GeolocatioService } from '@shared';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeafletService } from './leaflet.service';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [MatSnackBarModule],
      providers: [LeafletService, GeolocatioService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
