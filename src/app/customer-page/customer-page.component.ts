import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { ApiCallService } from '../service/api-call.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {

  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthServiceService,
    private route: Router,
    private api: ApiCallService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', Validators.email],
      city: [''],
      address: ['']
    });
  }

  logOut(){
    this.auth.logout();
    this.route.navigate(['/login']);
  }

  onSave(){
    if(this.customerForm.invalid){
      this.customerForm.markAllAsTouched();
      return;
    }

    const payload = this.customerForm.value;
    console.log('Saving payload', payload);

    // POST to backend. AuthInterceptor will add Authorization header automatically when token exists
    this.api.post('/networkLogs', payload).subscribe({
      next: (resp) => {
        console.log('Save response', resp);
        alert('Customer saved successfully');
        this.onClear();
      },
      error: (err) => {
        console.error('Save failed', err);
        alert('Failed to save customer');
      }
    });
  }

  onClear(){
    this.customerForm.reset();
  }

}
