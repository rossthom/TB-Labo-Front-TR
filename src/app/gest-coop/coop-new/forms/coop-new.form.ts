import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoopEmailCheckService } from "../../shared/services/coop-email-check.service";
import { NominatimService } from "../../../openstreetmap/shared/services/nominatim.service";
import { CoopEmailUnicityValidator } from "../../shared/validators/coopEmailUnicityCheck.validator";
import { matchPasswordValidator } from "../../shared/validators/matchPassword.validator";
import { NominatimValidator } from "../../../openstreetmap/shared/validators/nominatim.validator";


export function generateNewCoopForm(fb: FormBuilder, nominatimService: NominatimService, coopEmailCheckService: CoopEmailCheckService): FormGroup {
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
                    CoopEmailUnicityValidator.checkAddress(coopEmailCheckService)
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
