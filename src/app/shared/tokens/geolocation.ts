import { InjectionToken, inject } from '@angular/core';
import { NAVIGATOR } from './navigator';

export const GEOLOCATION = new InjectionToken<Geolocation>(
    'Geolocation object from Navigator object',
    {
        factory: () => inject(NAVIGATOR).geolocation
    }
)