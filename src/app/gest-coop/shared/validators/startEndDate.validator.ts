import { AbstractControl, ValidationErrors } from "@angular/forms";

export function startEndDateValidator(controlGroup: AbstractControl): ValidationErrors | null {
    if ( controlGroup.value['datetime_start'] && controlGroup.value['datetime_end'] ) {
        let startD = new Date(controlGroup.value['datetime_start'])
        let endD = new Date(controlGroup.value['datetime_end'])

        if (endD <= startD){
            return <ValidationErrors>{ StartEndDateValidator: "La date de fin ne peut pas être antérieure à la date de début" }
        }
    }
    
    return null;
}