import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from "@angular/common";
import { DishService } from '../services/dish.service';
import { Dish } from "../shared/dish";
import { switchMap } from 'rxjs';

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
   
   constructor(private dishService: DishService,
                private route: ActivatedRoute,
                private location: Location) { }

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
