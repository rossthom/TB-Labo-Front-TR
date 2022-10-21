import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OsmService } from "../../../openstreetmap/shared/services/osm.service";
import { NominatimValidator } from "../../../openstreetmap/shared/validators/nominatim.validator";


export function generateUpdCoopForm(fb: FormBuilder, osmService: OsmService): FormGroup {
    return fb.group({
        // Controls
        name: [
            "",
            {
                validators: [
                    Validators.required,
                    Validators.minLength(2),
                ],
            }
        ],
        coop_typeId: [
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
        addr_postal_code: [
            "",
            {
                validators: [
                    Validators.required,
                    Validators.pattern('^([0-9]{4})$'),
                ]
            }
        ],
        addr_city: [
            "", 
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
        logo: [
            "", 
            {
                validators: [
                    Validators.required,
                ]
            }
        ]
    },
    // Options
    <AbstractControlOptions>{
        validators: [],
        asyncValidators: [
            NominatimValidator.checkAddress(osmService),
        ],
        updateOn: 'blur'   // update when loses focus, that's what 'blur' means in this context      
    })
}
