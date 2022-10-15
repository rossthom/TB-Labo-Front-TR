import { AbstractControl, ValidationErrors } from "@angular/forms";

export function matchPasswordValidator(controlGroup: AbstractControl): ValidationErrors | null {
    if ( controlGroup.value['password'] && controlGroup.value['password_confirm'] ) {
        if (controlGroup.value['password'] != controlGroup.value['password_confirm']) {
            return <ValidationErrors>{ MatchPasswordValidator: "Les deux mots de passe ne correspondent pas." }
        }
    }
    
    return null;
}