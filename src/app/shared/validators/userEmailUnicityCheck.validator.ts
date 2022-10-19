import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable, switchMap, timer } from "rxjs";
import { UserAuthService } from "../services/user-auth.service";

export class UserEmailUnicityValidator {
    public static checkAddress(userAuthService: UserAuthService): AsyncValidatorFn | null {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return timer(200).pipe(
                switchMap(_ => userAuthService.checkUserEmailUnicity(control.value).pipe(
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