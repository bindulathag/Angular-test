import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, map, of } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Leader } from "../shared/leader";
import { LEADERS } from '../shared/leaders';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})

export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

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
  // getLeaders(): Observable<Leader[]>{
  //   return of(LEADERS).pipe(delay(2000));
  // }

  // getLeader(id: string): Observable<Leader>{
  //   return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  // }

  // getFeaturedLeader(): Observable<Leader>{
  //   return of(LEADERS.filter( leader => leader.featured )[0]).pipe(delay(2000));
  // }

  //Angular HttpClient
  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeaderIds(): Observable<number[] | any> {
    return this.getLeaders().pipe(map(leaders => leaders.map(leader => leader.id)))
      .pipe(catchError(error => error));
  }

  // putLeader(leader: Leader): Observable<Leader> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  //   };
  //   return this.http.put<Leader>(baseURL + 'leadership/' + leader.id, leader, httpOptions)
  //     .pipe(catchError(this.processHTTPMsgService.handleError));

  // }
}
