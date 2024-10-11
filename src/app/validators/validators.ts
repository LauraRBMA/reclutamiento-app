import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static nombreCompleto(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = control.value && control.value.trim().length > 0;
      return valid ? null : { nombreCompleto: 'El nombre completo es obligatorio.' };
    };
  }

  static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = control.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(control.value);
      return valid ? null : { email: 'Introduce un email válido.' };
    };
  }

  static fechaNacimiento(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = control.value && !isNaN(Date.parse(control.value));
      return valid ? null : { fechaNacimiento: 'La fecha de nacimiento es obligatoria.' };
    };
  }

  static aniosExperiencia(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = control.value && !isNaN(control.value) && control.value > 0;
      return valid ? null : { aniosExperiencia: 'Introduce un número de años válido.' };
    };
  }
}