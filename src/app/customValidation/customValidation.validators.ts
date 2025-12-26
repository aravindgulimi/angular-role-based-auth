import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static phoneNumberValidator(control: AbstractControl) {
    const phoneRegex = /^[0-9]{10}$/;
    if (control.value && !phoneRegex.test(control.value)) {
      return {
        validPhoneNumber:
          'Phone number must be exactly 10 digits and contain only numbers (0-9)',
      };
    }
    return null;
  }

  static emailValidator(control: AbstractControl) {
    if (control.value && !control.value.endsWith('@gmail.com')) {
      return { invalidDomain: 'Only Gmail addresses are allowed' };
    }
    return null;
  }
}
