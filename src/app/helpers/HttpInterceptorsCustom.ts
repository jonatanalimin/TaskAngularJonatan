import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { SpinnerService } from '../service/spinner.service';

@Injectable()
export class HttpInterceptorsCustom implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.spinnerService.requestStarted();
    return this.handler(next, request)
  }

  handler(next: HttpHandler, request: HttpRequest<any>){
    return next.handle(request)
      .pipe(
        tap({
          next: (event) => {
            if (event instanceof HttpResponse){
                this.spinnerService.requestEnded();
            }
          },
          error: (error) => {
            this.spinnerService.resetSpinner();
            throw error;
          }
        })
      )
  }
}