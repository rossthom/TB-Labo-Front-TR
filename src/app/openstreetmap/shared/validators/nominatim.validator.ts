import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms"
import { Observable, timer, switchMap, map } from 'rxjs';
import { Address } from "../models/types.model";
import { OsmService } from "../services/osm.service";


export class NominatimValidator {
    public static checkAddress(osmService: OsmService): AsyncValidatorFn | null {
        return (controlGroup: AbstractControl): Observable<ValidationErrors | null> => {
            let address = <Address>{
                postal_code: controlGroup.value['addr_postal_code'],
                city: controlGroup.value['addr_city'],
                street_name: controlGroup.value['addr_street_name'],
                street_nb: controlGroup.value['addr_street_nb']
            }

            return timer(200).pipe(
                switchMap(_ => osmService.getAddressGpsLongLat(address).pipe(
                    map((res: any[]) => {
                        if (res.length == 0){
                            return { NominatimValidator : "Adresse non trouvée sur OpenStreetMap" }
                        }
                        return null;
                    })
                ))
            )
        }
    }
}
