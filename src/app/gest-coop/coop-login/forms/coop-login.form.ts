import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from "@angular/forms";

export function generateCoopLoginForm(fb: FormBuilder): FormGroup {
    return fb.group({
        // Controls
        email: [
            "",
            {
                validators: [
                    Validators.required,
                    Validators.email,
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
        ]
    },
    // Options
    <AbstractControlOptions>{
        validators: [],
        asyncValidators: [],
        updateOn: 'blur'   // update when loses focus, that's what 'blur' means in this context      
    })
}
