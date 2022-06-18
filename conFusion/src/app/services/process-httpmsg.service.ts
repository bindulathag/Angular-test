import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }
  public handleError(resp: HttpErrorResponse | any) {
    let errMsg: string;

    if (resp.error instanceof ErrorEvent) {
      errMsg = resp.error.message;
    } else {
      errMsg = `${resp.status} - ${resp.statusText || ''} ${resp.error}`;
    }

    return throwError(errMsg);
  }
}
