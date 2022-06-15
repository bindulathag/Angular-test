import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Leader } from "../shared/leader";
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor() { }

  // getLeaders(): Leader[]{
  //   return LEADERS;
  // }

  // getLeader(id: string): Leader{
  //   return LEADERS.filter((leader) => (leader.id === id))[0];
  // }

  // getFeaturedLeader(): Leader{
  //   return LEADERS.filter( leader => leader.featured )[0];
  // }

  //promise
  // getLeaders(): Promise<Leader[]>{
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(LEADERS), 2000);
  //   });
  // }

  // getLeader(id: string): Promise<Leader>{
  //   return new Promise(resolve =>{
  //     setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
  //   });
  // }

  // getFeaturedLeader(): Promise<Leader>{
  //   return new Promise(resolve =>{
  //     setTimeout(() => resolve(LEADERS.filter( leader => leader.featured )[0]), 2000);
  //   });
  // }

  //Observable
  getLeaders(): Observable<Leader[]>{
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id: string): Observable<Leader>{
    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader>{
    return of(LEADERS.filter( leader => leader.featured )[0]).pipe(delay(2000));
  }
}
