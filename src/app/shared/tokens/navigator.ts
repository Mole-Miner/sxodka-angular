import { WINDOW } from './window';
import { InjectionToken, inject } from '@angular/core';

export const NAVIGATOR = new InjectionToken<Navigator>(
    'Navigator object from Window object',
    {
        factory: () => inject(WINDOW).navigator
    }
)