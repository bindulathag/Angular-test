import { Injectable } from '@angular/core';
import { DISHES } from "../shared/dishes";
import { Dish } from "../shared/dish";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  // Dependency Injection
  // getDishes(): Dish[]{
  //   return DISHES;
  // }
  // getDish(id: string): Dish{
  //   return DISHES.filter((dish) => (dish.id === id))[0];
  // }
  // getFeaturedDish(): Dish{
  //   return DISHES.filter(dish => dish.featured)[0];
  // }

  //Promises
  getDishes(): Promise<Dish[]>{
    return new Promise(resolve =>{
      setTimeout(() =>resolve(DISHES), 2000);
    });
  }
  getDish(id: string): Promise<Dish>{
    return new Promise(resolve =>{
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    });
  }
  getFeaturedDish(): Promise<Dish>{
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter(dish => dish.featured)[0]), 2000);
    });
  }


}
