import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable, switchMap, timer } from "rxjs";
import { CoopEmailCheckService } from "../services/coop-email-check.service";

export class CoopEmailUnicityValidator {
    public static checkAddress(coopEmailCheckService: CoopEmailCheckService/*, entity: Entity*/): AsyncValidatorFn | null {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return timer(200).pipe(
                switchMap(_ => coopEmailCheckService.checkCoopEmailUnicity(control.value/*, entity*/).pipe(
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