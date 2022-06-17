import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from "@angular/common";
import { DishService } from '../services/dish.service';
import { Dish } from "../shared/dish";
import { switchMap } from 'rxjs';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  //@Input()
  dishDetails: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentsForm: FormGroup;
  @ViewChild('cForm') commentsFormDirective: FormGroupDirective;
  //@ViewChild('slider') slider;
  updatedComment : Comment[];
  date = new Date().toISOString();
  ratingValue: number = 5;
  
  formErrors: {[key: string]: any}= {
    rating: this.ratingValue,
    comment: '',
    author: '',
    date: ''
  };

  validationMessages:{ [key: string]: any} = {
    'author': {
      'required': 'Author Name is required',
      'minlength': 'Author Name must be atleast 2 characters long',
      'maxlength': 'First Name cannot be more than 25 characters'
    },
    'comment': {
      'required': 'Comment is required'
    }
  }
  constructor(private dishService: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private formBuilder: FormBuilder) { 
    this.createForm();
  }
  createForm(){
    this.commentsForm = this.formBuilder.group({
      rating: this.ratingValue,
      comment:['',[Validators.required, Validators.minLength(1)]],
      author: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(25)]],
      date: this.date
    });


    this.commentsForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    
    this.onValueChanged();
  }

  onValueChanged(data?: any){
    if(!this.commentsForm){
      return;
    }
    const form = this.commentsForm;
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

  onSubmit():void{
    //this.updatedComment= this.commentsForm.value
    console.log(this.commentsForm.get('date'));
    //this.commentsForm.get('date').setValue((new Date()).toISOString());
    this.dishDetails.comments.push(this.commentsForm.value);
    //this.dishDetails.comments.
    //this.dishDetails.comments.push(this.updatedComment);
    this.commentsForm.reset({
      rating: this.ratingValue,
      comment: '',
      author: '',
      date: new Date()
    });
    this.commentsFormDirective.resetForm();
    this.commentsForm.controls['rating'].reset(this.ratingValue);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    //this.dishDetails = this.dishService.getDish(id);
    // this.dishService.getDish(id)
    //   .then( dish => this.dishDetails = dish);
    this.dishService.getDish(id)
      .subscribe( dish => this.dishDetails = dish);

    //params
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe( dish => {this.dishDetails = dish, this.setPrevNext(dish.id)});
  }

  setPrevNext(id: string){
    const index = this.dishIds.indexOf(id);
    const len = this.dishIds.length;
    this.prev = this.dishIds[(len + index - 1) % len];
    this.next = this.dishIds[(len + index + 1) % len];
  }
  goBack(): void{
    this.location.back();
  }
 
}
