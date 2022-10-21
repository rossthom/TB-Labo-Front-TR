import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OsmService } from "src/app/openstreetmap/shared/services/osm.service";
import { NominatimValidator } from "src/app/openstreetmap/shared/validators/nominatim.validator";
import { CoopEmailUnicityValidator } from "../../shared/validators/coopEmailUnicityCheck.validator";
import { matchPasswordValidator } from "../../shared/validators/matchPassword.validator";
import { CoopAuthService } from "../../shared/services/coop-auth.service";

export function generateNewCoopForm(fb: FormBuilder, osmService: OsmService, coopAuthService: CoopAuthService): FormGroup {
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
        email: [
            "",
            {
                validators: [
                    Validators.required,
                    Validators.email,
                ],
                asyncValidators: [
                    CoopEmailUnicityValidator.checkAddress(coopAuthService)
                ],
            }
        ],
        password: [
            "",
            {
                validators: [
                    Validators.required,
                ],
            }
        ],
        password_confirm: [
            "",
            {
                validators: [
                    Validators.required,
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
        validators: [
            matchPasswordValidator,
        ],
        asyncValidators: [
            NominatimValidator.checkAddress(osmService),
        ],
        updateOn: 'blur'   // update when loses focus, that's what 'blur' means in this context      
    })
}
