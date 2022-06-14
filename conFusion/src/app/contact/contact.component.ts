import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControlDirective, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Feedback,ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective: FormGroupDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telNum: ['', Validators.required],
      email: ['', Validators.required],
      agree: false,
      contactType: 'None',
      message: ''
    });
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
}
