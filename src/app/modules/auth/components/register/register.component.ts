import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading: boolean;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        first_name: new FormControl('', {
          validators: [Validators.required]
        }),
        last_name: new FormControl('', {
          validators: [Validators.required]
        }),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email]
        }),
        username: new FormControl('', {
          validators: [Validators.required]
        }),
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(8)]
        }),
        confirm_password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(8)]
        }),

      });
    this.onChanges();
  }

  onChanges(): void {
    const confirmPasswordControl = this.registerForm.controls.confirm_password;
    const passwordControl = this.registerForm.controls.password;
    confirmPasswordControl.valueChanges.subscribe(val => {
      if (passwordControl.value === val) {
        confirmPasswordControl.setErrors(null);
      } else {
        confirmPasswordControl.setErrors({ notMatchingPasswords: true });
      }
    });

    passwordControl.valueChanges.subscribe(val => {
      if (confirmPasswordControl.value === val) {
        confirmPasswordControl.setErrors(null);
      } else {
        confirmPasswordControl.setErrors({ notMatchingPasswords: true });
      }
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService
        .onRegister(
          this.registerForm.value.email,
          this.registerForm.value.password
        )
        .then(
          resp => {
            this.router.navigate(['/users']);
            this.isLoading = false;
          })
        .catch(error => {
          this.isLoading = false;
          this.snackBar.open(error.message, null, {
            duration: 3000
          });
        });
    } else {
      this.snackBar.open('Please fill all the required fields', null, {
        duration: 3000
      });
    }

  }
}
