import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NominatimService } from './shared/services/nominatim.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    NominatimService,
],
})
export class OpenstreetmapModule { }
