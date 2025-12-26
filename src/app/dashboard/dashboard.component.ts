import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { CustomValidators } from '../customValidation/customValidation.validators';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  customerForm!: FormGroup;

  customerTypes = ['Residential', 'Commercial', 'Industrial'];
  houseTypes = ['Independent', 'Apartment', 'Villa'];
  floors = ['Ground', '1', '2', '3', '4+'];
  areas = ['North', 'South', 'East', 'West'];
  cities = ['Meerut', 'Delhi', 'Mumbai'];
  paymentPlans = ['Prepaid', 'Postpaid', 'Monthly'];

  constructor(private fb: FormBuilder, private auth: AuthServiceService, private route: Router) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      bpNumber: [''],
      customerType: ['', Validators.required],
      fullName: ['', Validators.required],
      middleName: [''],
      applicationDate: ['', Validators.required],
      ownership: ['Owner'],

      mobile: ['', [Validators.required, Validators.minLength(10),CustomValidators.phoneNumberValidator]],
      altMobile: [''],
      email: ['', Validators.email],
      landline: [''],

      houseType: ['', Validators.required],
      flatNo: ['', Validators.required],
      floor: [''],
      society: [''],
      street: ['', Validators.required],
      landmark: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', Validators.required],

      paymentPlan: ['', Validators.required],
      hasLpg: ['No'],
      isBulk: [false],
      urgent: [false]
    });
  }

  onSearch(){
    const bp = this.customerForm.get('bpNumber')?.value;
    if(bp){
      console.log('Searching for', bp);
    }
  }

  onSave(){
    if(this.customerForm.invalid){
      this.customerForm.markAllAsTouched();
      return;
    }
    // const payload = this.customerForm.value;
    // console.log('Save payload', payload);
    // alert('Saved (mock)');
    console.log(this.customerForm.value);
    
  }

  onClear(){
    this.customerForm.reset({ownership:'Owner', hasLpg:'No', isBulk:false, urgent:false});
  }

  logout(){
    this.auth.logout();
    this.route.navigate(['/login']);
  }

}
