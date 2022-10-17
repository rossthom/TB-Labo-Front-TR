import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable, switchMap, timer } from "rxjs";
import { EmailCheckService, Entity } from "../services/email-check.service";

export class EmailUnicityValidator {
    public static checkAddress(emailCheckService: EmailCheckService, entity: Entity): AsyncValidatorFn | null {
        return (controlGroup: AbstractControl): Observable<ValidationErrors | null> => {
            let email = controlGroup.value['email']

            return timer(200).pipe(
                switchMap(_ => emailCheckService.checkEmailUnicity(email, entity).pipe(
                    map((res: any[]) => {
                        if (res.length == 0){
                            return { EmailUnicityValidator : "Cette adresse est déjà utilisée" }
                        }
                        return null;
                    })
                ))
            )
        }
    }
}