import { GEOLOCATION } from './../tokens/geolocation';
import { Inject, Injectable } from '@angular/core';
import { finalize, multicast, Observable, refCount, share, shareReplay, Subscriber } from 'rxjs';

@Injectable()
export class GeolocatioService {
    constructor(@Inject(GEOLOCATION) private readonly geolocation: Geolocation) { }

    getCurrentPosition(): Observable<GeolocationPosition> {
        return new Observable<GeolocationPosition>((subscriber: Subscriber<GeolocationPosition>) => {
            if (!this.geolocation) {
                subscriber.error('Geolocation is not supported');
            }
            this.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    subscriber.next(position);
                    subscriber.complete();
                },
                (error: GeolocationPositionError) => subscriber.error(error),
                { enableHighAccuracy: true }
            );
        }).pipe(share());
    }

    // watchPosition(): Observable<GeolocationPosition> {
    //     return new Observable<GeolocationPosition>((subscriber: Subscriber<GeolocationPosition>) => {
    //         this.geolocation.watchPosition(
    //             (position) => subscriber.next(position),

    //         );
    //     }).pipe(
    //         finalize(() => this.geolocation.clearWatch(1)),
    //         shareReplay({ bufferSize: 1, refCount: true })
    //     );
    // }
}