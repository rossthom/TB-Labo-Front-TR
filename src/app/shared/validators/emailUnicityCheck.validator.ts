import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable, switchMap, timer } from "rxjs";
import { EmailCheckService, Entity } from "../services/email-check.service";

export class EmailUnicityValidator {
    public static checkAddress(emailCheckService: EmailCheckService, entity: Entity): AsyncValidatorFn | null {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return timer(200).pipe(
                switchMap(_ => emailCheckService.checkEmailUnicity(control.value, entity).pipe(
                    map((res: any[]) => {
                        if (res.length != 0){
                            return { EmailUnicityValidator : "Cette adresse email est déjà utilisée" }
                        }
                        return null;
                    })
                ))
            )
        }
    }
}