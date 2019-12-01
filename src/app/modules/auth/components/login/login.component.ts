import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)]
      })
    });
  }
  onGoogleSignIn(user?: IUser) {
    this.authService.googleSignIn()
      .then(response => {
        this.router.navigate(['/users']);

        // user.displayName = response.user.displayName;
        // user.photoURL = response.user.photoURL;
        // user.uid = response.user.uid;
        // console.log('Response from login component', response);

        // this.snackBar.open('You have been signed in, welcome', response.user.displayName, {
        //   duration: 3000
        // });
      })
      .catch(error => {
        this.snackBar.open(error.message, null, {
          duration: 3000
        });
      });
  }



  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .onLogin(
          this.loginForm.value.email,
          this.loginForm.value.password
        )
        .then(resp => {
          this.router.navigate(['/users']);
          this.snackBar.open('Welcome back to TechPro', null, {
            duration: 3000
          });
        })
        .catch(error => {
          this.snackBar.open(error.message, null, {
            duration: 3000
          });
        });

    } else {
      this.snackBar.open('Please fill  all the required fields', null, {
        duration: 3000
      });
    }
  }

  onPasswordReset() {
    const email = this.loginForm.value.email;
    this.authService
      .onResetPassword(email)
      .then((resp: any) => {
        this.snackBar.open('An email has been sent to reset password', null, {
          duration: 3000
        });
      })
      .catch(error => {
        this.snackBar.open(error.message, null, {
          duration: 3000
        });
      });
  }

}
