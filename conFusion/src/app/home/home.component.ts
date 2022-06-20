import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from "../services/promotion.service";
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrorMsg: string;
  leaderErrorMsg: string;
  promotionErrorMsg: any;

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
    // this.dishService.getFeaturedDish()
    //   .subscribe(dish =>this.dish = dish);
    // this.promotionService.getFeaturedPromotion()
    //   .subscribe(promotion => this.promotion = promotion);
    // this.leaderService.getFeaturedLeader()
    //   .subscribe(leader => this.leader = leader);

    //HTTP Client
    this.dishService.getFeaturedDish()
      .subscribe(dish =>this.dish = dish,
        dishErrorMsg => this.dishErrorMsg =<any>dishErrorMsg);
    this.promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        promotionErrorMsg => this.promotionErrorMsg =<any>promotionErrorMsg);
    this.leaderService.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        leaderErrorMsg => this.leaderErrorMsg =<any>leaderErrorMsg);

  }

}
