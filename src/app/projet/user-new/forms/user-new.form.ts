import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NominatimService } from "src/app/openstreetmap/shared/services/nominatim.service";
import { matchPasswordValidator } from "src/app/gest-coop/shared/validators/matchPassword.validator";
import { NominatimValidator } from "src/app/openstreetmap/shared/validators/nominatim.validator";
import { UserEmailCheckService } from "src/app/shared/services/user-email-check.service";
import { UserEmailUnicityValidator } from "src/app/shared/validators/userEmailUnicityCheck.validator";

export function generateNewUserForm(fb: FormBuilder, nominatimService: NominatimService, userEmailCheckService: UserEmailCheckService): FormGroup {
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
                    UserEmailUnicityValidator.checkAddress(userEmailCheckService)
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
            NominatimValidator.checkAddress(nominatimService),
        ],
        updateOn: 'blur'   // update when loses focus, that's what 'blur' means in this context      
    })
}
