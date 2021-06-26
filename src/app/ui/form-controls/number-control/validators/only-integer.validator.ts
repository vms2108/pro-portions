import { AbstractControl, ValidationErrors } from '@angular/forms';

export function onlyIntegerValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value || 0);

  if (value === Math.round(value)) {
    return null;
  }

  return { 'only-integer': true };
}
