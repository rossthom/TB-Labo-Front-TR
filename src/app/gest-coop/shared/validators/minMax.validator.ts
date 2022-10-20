import { AbstractControl, ValidationErrors } from "@angular/forms";

export function minMaxValidator(controlGroup: AbstractControl): ValidationErrors | null {
    if ( controlGroup.value['nb_people_min'] && controlGroup.value['nb_people_max'] ) {
        if (controlGroup.value['nb_people_max'] < controlGroup.value['nb_people_min']){
            return <ValidationErrors>{ MinMaxValidator: "Valeur maximum inférieure à valeur minimum" }
        }
    }
    
    return null;
}