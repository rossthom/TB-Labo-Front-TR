import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable, switchMap, timer } from "rxjs";
import { CoopAuthService } from "../services/coop-auth.service";

export class CoopEmailUnicityValidator {
    public static checkAddress(coopAuthService: CoopAuthService): AsyncValidatorFn | null {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return timer(200).pipe(
                switchMap(_ => coopAuthService.checkCoopEmailUnicity(control.value).pipe(
                    map((res: any[]) => {
                        if (res.length != 0){
                            return { CoopEmailUnicityValidator : "Cette adresse email est déjà utilisée" }
                        }
                        return null;
                    })
                ))
            )
        }
    }
}