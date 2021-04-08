import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CreditCardValidators, CreditCard } from 'angular-cc-library';
import { defer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  card ={
    cardNumber : "",
    cardName : "",
    cvvNumber : "",
    expirationMonth : "",
    expirationYear : ""
  };
  
  month = [
    {"id": "01", "name" : "January"},
    {"id": "02", "name" : "February"},
    {"id": "03", "name" : "March"},
    {"id": "04", "name" : "April"},
    {"id": "05", "name" : "May"},
    {"id": "06", "name" : "June"},
    {"id": "07", "name" : "July"},
    {"id": "08", "name" : "August"},
    {"id": "09", "name" : "September"},
    {"id": "10", "name" : "October"},
    {"id": "11", "name" : "November"},
    {"id": "12", "name" : "December"}
  ];
  
  thisYear = (new Date()).getFullYear();
  year = [{"id": 0, "name":this.thisYear}];

  public demoForm: FormGroup;
  public submitted = false;
  public eventCard = true;
  public eventNumber = true;
  public eventName = true;
  public eventExp = true;

 
  public validateNumber = true;
  public validateName = true;
  public validateMonth = true;
  public validateYear = true;
  public validateCVV = true;


  public type$ = defer(() => this.demoForm.get('creditCard').valueChanges)
    .pipe(map((num: string) => CreditCard.cardType(num)));

  constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.demoForm = this.fb.group({
      creditCard: ['', [CreditCardValidators.validateCCNumber]],
      name: ['', [CreditCardValidators.validateCCName]],
      expMonth: ['', [CreditCardValidators.validateExpMonth]],
      expYear: ['', [CreditCardValidators.validateExpYear]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    });
    
    for(let i=1 ; i<= 10 ; i++){
      
      let objYear = { 'id': i, 'name': this.thisYear+i};
      this.year.push(objYear);

    }
    console.log("this.year : " + this.year);
  }

  public goToNextField(controlName: string, nextField: HTMLInputElement) {
    if (this.demoForm.get(controlName)?.valid) {
      nextField.focus();
    }
  }

  public EventCard(result: boolean) {
    this.eventCard = result;
  }

  public EventCardNumber(result: boolean) {
    this.eventNumber = result;
  }

  public EventCardName(result: boolean) {
    this.eventName = result;
  }

  public EventCardExp(result: boolean) {
    this.eventExp = result;
  }

  public resultMonth( month : string) {
    this.card.expirationMonth = month;
  }

  public resultYear( year : string) {
    this.card.expirationYear = year;
  }

  public checkData() {
    this.validateNumber = true;
    this.validateName = true;
    this.validateMonth = true;
    this.validateYear = true;
    this.validateCVV = true;

    if(this.card.cardNumber == ""){
      this.validateNumber = false;
    }
    if(this.card.cardName == ""){
      this.validateName = false;
    }
    if(this.card.expirationMonth == ""){
      this.validateMonth = false;
    }
    if(this.card.expirationYear == ""){
      this.validateYear = false;
    }
    if(this.card.cvvNumber == ""){
      this.validateCVV = false;
    }
    
  }

}
