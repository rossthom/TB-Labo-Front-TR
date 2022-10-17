import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailCheckService, Entity } from "src/app/shared/services/email-check.service";
import { EmailUnicityValidator } from "src/app/shared/validators/emailUnicityCheck.validator";
import { NominatimService } from "../../shared/services/nominatim.service";
import { matchPasswordValidator } from "../../shared/validators/matchPassword.validator";
import { NominatimValidator } from "../../shared/validators/nominatim.validator";


export function generateNewCoopForm(fb: FormBuilder, nominatimService: NominatimService, emailCheckService: EmailCheckService, entity: Entity): FormGroup {
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
                    EmailUnicityValidator.checkAddress(emailCheckService, entity)
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
