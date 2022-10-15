import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NominatimService } from "../../services/nominatim.service";
import { minMaxValidator } from "../../validators/minMax.validator";
import { NominatimValidator } from "../../validators/nominatim.validator";
import { startEndDateValidator } from "../../validators/startEndDate.validator";

export function generateCRUEventForm(fb: FormBuilder, nominatimService: NominatimService): FormGroup {
    return fb.group({
        name: [
            "",
            {
                validators: [
                    Validators.required,
                    Validators.minLength(2),
                ],
            }
        ],
        event_typeId: [
            "", 
            {
                validators: [
                    Validators.required,
                ]
            }
        ],
        description: [
            "", 
            {}
        ],
        location: [
            "", 
            {}
        ],
        addr_postal_code: [
            "", // Valeur par défaut.
            {
                validators: [
                    Validators.required,
                    Validators.pattern('^([0-9]{4})$'),
                    //Validators.minLength(4),
                    //Validators.maxLength(4),
                ]
            }
        ],
        addr_city: [
            "", // Valeur par défaut.
            {
                validators: [
                    Validators.required,
                ]
            }
        ],
        addr_street_name: [
            "", 
            {}
        ],
        addr_street_nb: [
            "", 
            {}
        ],
        datetime_start: [
            "", 
            {
                validators: [
                    Validators.required,
                    // TODO: autre validateur sur Event DateTime Start ?
                ]
            }
        ],
        datetime_end: [
            "", 
            {
                validators: [
                    Validators.required,
                    // TODO: autre validateur sur Event DateTime End ?
                ]
            }
        ],
        nb_people_min: [
            "", 
            {
                validators: [
                    Validators.required,
                    Validators.pattern('^([0-9]{1,4})$')
                ]
            }
        ],
        nb_people_max: [
            "", // Valeur par défaut.
            {
                validators: [
                    Validators.required,
                    Validators.pattern('^([0-9]{1,4})$')
                ]
            }
        ],
    },
    {
        validators: [
            startEndDateValidator,
            minMaxValidator,
        ],
        asyncValidators: [
            NominatimValidator.checkAddress(nominatimService),
        ],
        updateOn: 'blur'    // update when loses focus, that's what 'blur' means in this context      
    })
}
