import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/*
export function generateUpdCoopForm(fb: FormBuilder, httpC: HttpClient): FormGroup {
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
        email: [
            "", // Valeur par défaut.
            {
                validators: [
                    Validators.required,
                    Validators.email,
                ]
            }
        ],
        password: [
            "", // Valeur par défaut.
            {
                validators: [
                    Validators.required,
                    Validators.minLength(6),
                ]
            }
        ],
        confirmPwd: [
            "", // Valeur par défaut.
            {
                validators: [
                    Validators.required,
                    Validators.minLength(6),
                ]
            }
        ],
        country: [
            "", // Valeur par défaut.
            {
                validators: null,
                asyncValidators: [
                    AsyncCountryValidator.check(httpC),
                ],
                updateOn: 'change'
            }
        ],
    },
    {
        // Options
        validators: [
            matchPasswordValidator,
        ],
        updateOn: 'blur'    // update when loses focus, that's what 'blur' means in this context      
    })
}
*/