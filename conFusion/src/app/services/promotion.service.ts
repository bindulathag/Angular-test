import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Promotion } from '../shared/promotion';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  // getPromotions(): Promotion[]{
  //   return PROMOTIONS;
  // }
  // getPromotion(id: string): Promotion{
  //   return PROMOTIONS.filter((promotion) => (promotion.id === id))[0];
  // }
  // getFeaturedPromotion(): Promotion{
  //   return PROMOTIONS.filter( promotion => promotion.featured)[0];
  // }

  //promises
  // getPromotions(): Promise<Promotion[]>{
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(PROMOTIONS), 2000);
  //   });
  // }
  // getPromotion(id: string): Promise<Promotion>{
  //   return new Promise(resolve =>{
  //     setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]), 2000);
  //   });
  // }
  // getFeaturedPromotion(): Promise<Promotion>{
  //   return new Promise(resolve =>{
  //   });
  //     setTimeout(() => resolve(PROMOTIONS.filter(promotion => promotion.featured)[0]), 2000);
  // }

  //Observable
  // getPromotions(): Observable<Promotion[]>{
  //   return of(PROMOTIONS).pipe(delay(2000));
  // }
  // getPromotion(id: string): Observable<Promotion>{
  //   return of(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]).pipe(delay(2000));
  // }
  // getFeaturedPromotion(): Observable<Promotion>{
  //   return of(PROMOTIONS.filter( promotion => promotion.featured)[0]).pipe(delay(2000));
  // }

  //Angular HttpClient
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true')
      .pipe(map(promotions => promotions[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotionIds(): Observable<number[] | any> {
    return this.getPromotions().pipe(map(promotions => promotions.map(promotion => promotion.id)))
      .pipe(catchError(error => error));
  }

  // putPromotion(promotion: Promotion): Observable<Promotion> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  //   };
  //   return this.http.put<Promotion>(baseURL + 'promotions/' + promotion.id, promotion, httpOptions)
  //     .pipe(catchError(this.processHTTPMsgService.handleError));

  // }
}
