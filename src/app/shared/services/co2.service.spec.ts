import { TestBed } from '@angular/core/testing';
import { MarkerIcon } from '../models/marker-icon.model';

import { Co2Service } from './co2.service';

describe('Co2Service', () => {
  let service: Co2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Co2Service);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('tests calculateRoughDistanceInMeters(start: GpsPosition, end:GpsPosition)', () => {
    expect(service.calculateRoughDistanceInMeters(
      {lon: 4.8723252, lat: 50.4589561}, {lon: 4.8586927, lat: 50.4739593}
    ))
    .withContext("{lon: 4.8723252, lat: 50.4589561}, {lon: 4.8586927, lat: 50.4739593}")
    .toBe(2204.86629419597);
  });


  it('tests getEventMarkerIcon(distance: number)', () => {
    expect(service.getEventMarkerIcon(19000))
    .withContext("distance = 19000")
    .toEqual(<MarkerIcon>{
      retina: "assets/app/images/colored-marker-event-2x.png",
      regular: "assets/app/images/colored-marker-event.png"
    });

    expect(service.getEventMarkerIcon(20000))
    .withContext("distance = 20000")
    .toEqual(<MarkerIcon>{
      retina: "assets/app/images/colored-marker-event-2x.png",
      regular: "assets/app/images/colored-marker-event.png"
    });
    
    expect(service.getEventMarkerIcon(30000))
    .withContext("distance = 30000")
    .toEqual(<MarkerIcon>{
      retina: "assets/app/images/colored-marker-event-medium-2x.png",
      regular: "assets/app/images/colored-marker-event-medium.png"
    });
    
    expect(service.getEventMarkerIcon(40000))
    .withContext("distance = 40000")
    .toEqual(<MarkerIcon>{
      retina: "assets/app/images/colored-marker-event-medium-2x.png",
      regular: "assets/app/images/colored-marker-event-medium.png"
    });
    
    expect(service.getEventMarkerIcon(50000))
    .withContext("distance = 50000")
    .toEqual(<MarkerIcon>{
      retina: "assets/app/images/colored-marker-event-far-2x.png",
      regular: "assets/app/images/colored-marker-event-far.png"
    });
  });

  it('tests getMarkSign(distance: number)', () => {
    expect(service.getMarkSign(19000))
    .withContext("distance = 19000")
    .toBe("🟢");

    expect(service.getMarkSign(20000))
    .withContext("distance = 20000")
    .toBe("🟢");

    expect(service.getMarkSign(30000))
    .withContext("distance = 30000")
    .toBe("🟠");

    expect(service.getMarkSign(40000))
    .withContext("distance = 40000")
    .toBe("🟠");

    expect(service.getMarkSign(50000))
    .withContext("distance = 50000")
    .toBe("🔴");
  });
});
