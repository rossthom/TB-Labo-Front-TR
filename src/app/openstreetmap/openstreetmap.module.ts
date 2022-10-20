import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsmService } from './shared/services/osm.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    OsmService,
],
})
export class OpenstreetmapModule { }
