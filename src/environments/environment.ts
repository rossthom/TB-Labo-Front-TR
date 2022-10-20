// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  // Backends URLs
  dataUrl: "http://localhost:3000/",
  nominatimUrl: "https://nominatim.openstreetmap.org/search?",
  openrouteUrl: "https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62481e238567dd89481f90b77f9e0b8e23d2",

  // Storage Keys
  coopIdKey: "coopId",
  userIdKey: "userId",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
