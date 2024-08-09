// import { Component, OnInit } from '@angular/core';
// import * as yup from 'yup';
// import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// // Define the type for your form values
// interface FormValues {
//   name: string;
//   email: string;
//   password: string;
// }

// // Create the validation schema with the defined type
// const validationSchema: yup.ObjectSchema<FormValues> = yup.object({
//   name: yup.string().required('Name is required'),
//   email: yup.string().email('Invalid email format').required('Email is required'),
//   password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required')
// });

// // Create a custom validator using the schema
// export function yupValidator(schema: yup.ObjectSchema<any>): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     try {
//       schema.validateSync(control.value, { abortEarly: false });
//       return null;
//     } catch (err: unknown) {
//       if (err instanceof yup.ValidationError) {
//         const errors = err.inner.reduce((acc: Record<string, string>, curr) => {
//           acc[curr.path!] = curr.message;
//           return acc;
//         }, {});
//         return errors;
//       } else {
//         // Handle other types of errors if necessary
//         return { unknownError: 'An unknown error occurred' };
//       }
//     }
//   };
// }

// @Component({
//   selector: 'app-test',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './test.component.html',
//   styleUrls: ['./test.component.css']
// })
// export class TestComponent implements OnInit {
//   form: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.form = this.fb.group({
//       name: [''],
//       email: [''],
//       password: ['']
//     }, { validators: yupValidator(validationSchema) });
//   }

//   ngOnInit() {
//     // Initialization logic if needed
//   }

//   onSubmit() {
//     if (this.form.valid) {
//       console.log('Form Submitted!', this.form.value);
//     } else {
//       console.log('Form Errors', this.form.errors);
//     }
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, VERSION } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as Yup from 'yup';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  // form group
  fcGroupSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email không được để trống')
      .email('Email không đúng định dạng'),
    full_name: Yup.string().required('Họ tên không được để trống'),
    password: Yup.string()
      .required('Trường này không được để trống')
      .min(8, 'Độ dài tối thiểu 8 kí tự'),
    password_confirmation: Yup.string()
      .required('Trường này không được để trống')
      .min(8, 'Độ dài tối thiểu 8 kí tự'),
  });
  fg = new FormGroup(
    {
      full_name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      password_confirmation: new FormControl(''),
    },
    [],

    validateYupSchema(this.fcGroupSchema)
  );
}

export function validateYupSchema<T>(
  yupSchema: Yup.Schema<T>
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return from(yupSchema.validate(control.value, { abortEarly: false })).pipe(
      map(() => null),
      catchError((e) => {
        const errors: ValidationErrors = {};
        if (e.inner && e.inner.length) {
          e.inner.forEach((err: Yup.ValidationError) => {
            if (err.path) {
              errors[err.path] = err.message;
            }
          });
        } else if (e.path) {
          errors[e.path] = e.message;
        }
        return of(errors);
      })
    );
  };
}
