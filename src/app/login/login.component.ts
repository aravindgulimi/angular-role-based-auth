import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../customValidation/customValidation.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private route : Router, private auth: AuthServiceService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, CustomValidators.emailValidator]],
      password: ['', Validators.required]
    });
  }

  onLogin(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    const {email, password} = this.loginForm.value;
    this.auth.login(email, password).subscribe({
      next: (resp) => {
        console.log('Login successful', resp);
        if(resp) {
          const role = resp.user?.role;
          if(role === 'Admin'){
            this.route.navigate(['/dashboard']);
          } else if(role === 'Customer'){
            this.route.navigate(['/customer']);
          } else {
            this.route.navigate(['/login']);
          }
        } else {
          alert('Invalid credentials');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed');
      }
    });
  }

  onForgot(){
    alert('Open forgot password flow');
  }








  
  // isloading = false;
  // error = '';
  
  // form!: FormGroup;

  // constructor(private auth: AuthServiceService,
  //   private route : Router, private fb: FormBuilder
  // ){}

  // ngOnInit(): void {
  //   this.form = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]]
  //   });
  // }

  // onSubmit(){
  //   this.error = '';
  //   if(this.form.invalid){
  //     this.form.markAllAsTouched();
  //     return;
  //   }
  //   this.isloading = true;
  //   const {email, password} = this.form.value;

  //   this.auth.login(email!, password!).subscribe({
  //     next: resp => {
  //       this.isloading =false;

  //       if(!resp){
  //         this.error = 'Invalid Data';
  //         return;
  //       }
  //       if(resp.user.role === 'admin'){
  //         this.route.navigate(['/admin']);
  //       }else{
  //         this.route.navigate(['/customer']);
  //       }
  //     },
  //     error : err => {
  //       this.isloading = false;
  //       this.error = 'Login Failed';
  //       console.log(err);
  //     }
  //   })
  // }

  // onForgot(): void {
  //   // navigate to forgot password or open modal
  //   console.log('forgot password clicked');
  // }

}
