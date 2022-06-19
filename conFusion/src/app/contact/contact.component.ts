import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControlDirective, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { flyInOut } from '../animations/app.animation';
import { Feedback,ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    // expand()
  ]
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective: FormGroupDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  formErrors: {[key: string]: any}= {
    'firstName': '',
    'lastName': '',
    'telNum':'',
    'email':''
  };

  validationMessages:{ [key: string]: any} = {
    'firstName': {
      'required': 'First Name is required',
      'minlength': 'First Name must be atleast 2 characters',
      'maxlength': 'First Name cannot be more than 25 characters'
    },
    'lastName': {
      'required': 'Last Name is required',
      'minlength': 'Last Name must be atleast 2 characters',
      'maxlength': 'Last Name cannot be more than 25 characters'
    },
    'telNum':{
      'required': 'Tel. Number is required',
      'pattern': 'Tel. Number must be Numbers'
    },
    'email':{
      'required': 'Email is required',
      'email': 'Email is not valid'
    }
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstName: ['', [Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telNum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contactType: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    
    this.onValueChanged();//reset the validation messages
  }

  onSubmit():void{
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstName: '',
      lastName: '',
      telNum: '',
      email: '',
      agree: false,
      contactType: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

  onValueChanged(data?: any){
    if(!this.feedbackForm){
      return;
    }
    const form = this.feedbackForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';//clear prev error msgs if any
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] +' ';
            }
          }
        }
      }
    }
  }
}
