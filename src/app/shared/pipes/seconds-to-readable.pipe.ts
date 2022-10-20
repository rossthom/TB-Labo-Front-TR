import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondToReadable'
})
export class SecondsToReadablePipe implements PipeTransform {
  
  transform(value: number, ...args: unknown[]): string {
    return (value != undefined) ? this.secondsToDhms(value) : ""
  }
  
  secondsToDhms(seconds: number): string {
    if (seconds == 0) {
      return "0 secondes";
    }
    
    seconds = Number(seconds);
    let d = Math.floor(seconds / (3600*24));
    let h = Math.floor(seconds % (3600*24) / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);
    
    let dDisplay = d > 0 ? d + (d == 1 ? " jour, " : " jours, ") : "";
    let hDisplay = h > 0 ? h + " h, " : "";
    let mDisplay = m > 0 ? m + " min, " : "";
    let sDisplay = s > 0 ? s + " s" : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }
}
