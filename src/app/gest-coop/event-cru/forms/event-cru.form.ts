import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OsmService } from "../../../openstreetmap/shared/services/osm.service";
import { minMaxValidator } from "../../shared/validators/minMax.validator";
import { NominatimValidator } from "../../../openstreetmap/shared/validators/nominatim.validator";
import { startEndDateValidator } from "../../shared/validators/startEndDate.validator";

export function generateCRUEventForm(fb: FormBuilder, osmService: OsmService): FormGroup {
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
        datetime_start: [
            "", 
            {
                validators: [
                    Validators.required,
                ]
            }
        ],
        datetime_end: [
            "", 
            {
                validators: [
                    Validators.required,
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
            "",
            {
                validators: [
                    Validators.required,
                    Validators.pattern('^([0-9]{1,4})$')
                ]
            }
        ],
    },
    // Options
    <AbstractControlOptions>{
        validators: [
            startEndDateValidator,
            minMaxValidator,
        ],
        asyncValidators: [
            NominatimValidator.checkAddress(osmService),
        ],
        updateOn: 'blur'    // update when loses focus, that's what 'blur' means in this context      
    })
}
