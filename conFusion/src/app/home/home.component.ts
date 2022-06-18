import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from "../services/promotion.service";
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  constructor(private dishService: DishService, 
              private promotionService: PromotionService,
              private leaderService: LeaderService,
              @Inject('BaseURL') public BaseURL: string){ }

  ngOnInit(): void {
    // this.dish = this.dishService.getFeaturedDish();
    // this.promotion = this.promotionService.getFeaturedPromotion();
    // this.leader = this.leaderService.getFeaturedLeader();
    
    //Promises
    // this.dishService.getFeaturedDish()
    //   .then(dish => this.dish = dish);
    // this.promotionService.getFeaturedPromotion()
    //   .then(promotion =>this.promotion = promotion);
    // this.leaderService.getFeaturedLeader()
    //   .then(leader => this.leader = leader);

    //Observable
    this.dishService.getFeaturedDish()
      .subscribe(dish =>this.dish = dish);
    this.promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedLeader()
      .subscribe(leader => this.leader = leader);

  }

}
