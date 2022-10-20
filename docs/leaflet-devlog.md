# LEAFLET
source: https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet

- Install leaflet
npm install leaflet --legacy-peer-deps
npm i --save-dev @types/leaflet --legacy-peer-deps

- component:
import L from 'leaflet';
or
import * as L from 'leaflet';

- angular.json:
    architect>build>options>styles, add
        "./node_modules/leaflet/dist/leaflet.css",


## simple leaflet markers:
source: https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet-marker-service
- angular.json:
    architect>build>options>assets, add:
        {
        "glob": "**/*",
        "input": "node_modules/leaflet/dist/images/",
        "output": "./assets"
        }


# FA-Markers:
source: https://www.npmjs.com/package/leaflet-fa-markers

- install 
    npm i leaflet-fa-markers --legacy-peer-deps
    npm i --save-dev @types/leaflet-fa-markers --legacy-peer-deps

