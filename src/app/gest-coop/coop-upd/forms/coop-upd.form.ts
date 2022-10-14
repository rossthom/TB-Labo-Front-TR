import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NominatimService } from "../../services/nominatim.service";
import { NominatimValidator } from "./validators/nominatim.validator";


export function generateUpdCoopForm(fb: FormBuilder, nominatimService: NominatimService): FormGroup {
    return fb.group({
        // Controls
        name: [
            "", // Valeur par défaut. (Le champ ne sera pas considéré comme touché et toujours pristine)
            {
                validators: [
                    Validators.required,
                    Validators.minLength(2),
                ],
            }
        ],
        coop_typeId: [
            "", // Valeur par défaut.
            {
                validators: [
                    Validators.required,
                ]
            }
        ],
        description: [
            "", // Valeur par défaut.
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
            "", // Valeur par défaut.
            {}
        ],
        addr_street_nb: [
            "", // Valeur par défaut.
            {}
        ],
        logo: [
            "", // Valeur par défaut.
            {}
        ]
    },
    {
        asyncValidators: [
            NominatimValidator.checkAddress(nominatimService),
        ],
        // Options
        updateOn: 'blur'    // update when loses focus, that's what 'blur' means in this context      
    })
}
