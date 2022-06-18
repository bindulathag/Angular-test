import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from "../services/dish.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  errorMsg: string;
  //selectedDish: Dish;

  constructor(private dishService:DishService, @Inject('BaseURL') public  BaseURL: string) { 
  }

  ngOnInit(): void {
    //Dependency Injection
    //this.dishes = this.dishService.getDishes();

    //Promises
    // this.dishService.getDishes()
    //   .then(dishes => this.dishes = dishes);

    //Observable
    this.dishService.getDishes().subscribe(
      dishes => this.dishes = dishes,
      errorMsg => this.errorMsg = <any>errorMsg
      );
  }
  
  // onSelect(dish: Dish){
  //   this.selectedDish = dish;
  // }

}
