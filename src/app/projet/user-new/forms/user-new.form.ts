import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OsmService } from "src/app/openstreetmap/shared/services/osm.service";
import { UserAuthService } from "src/app/shared/services/user-auth.service";
import { matchPasswordValidator } from "src/app/gest-coop/shared/validators/matchPassword.validator";
import { NominatimValidator } from "src/app/openstreetmap/shared/validators/nominatim.validator";
import { UserEmailUnicityValidator } from "src/app/shared/validators/userEmailUnicityCheck.validator";

export function generateNewUserForm(fb: FormBuilder, osmService: OsmService, userAuthService: UserAuthService): FormGroup {
    return fb.group({
        // Controls
        first_name: [
            "",
            {
                validators: [
                    Validators.required,
                    Validators.minLength(2),
                ],
            }
        ],
        last_name: [
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
                    UserEmailUnicityValidator.checkAddress(userAuthService)
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
        birth_date: [
            "", 
            {
                validators: [
                    Validators.required,
                ]
            }
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
