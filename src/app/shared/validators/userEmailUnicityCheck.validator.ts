import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable, switchMap, timer } from "rxjs";
import { UserEmailCheckService } from "../services/user-email-check.service";

export class UserEmailUnicityValidator {
    public static checkAddress(userEmailCheckService: UserEmailCheckService/*, entity: Entity*/): AsyncValidatorFn | null {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return timer(200).pipe(
                switchMap(_ => userEmailCheckService.checkUserEmailUnicity(control.value/*, entity*/).pipe(
                    map((res: any[]) => {
                        if (res.length != 0){
                            return { UserEmailUnicityValidator : "Cette adresse email est déjà utilisée" }
                        }
                        return null;
                    })
                ))
            )
        }
    }
}