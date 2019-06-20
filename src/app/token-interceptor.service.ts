import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  // For more safety, we inject the authService differently than usual, we don't inject it directly, so we import Injector
  constructor(
    private injector: Injector
  ) { }

  intercept(req, next) {
    // We use Injector to get an instance of AuthService
    let authService = this.injector.get(AuthService)
    //  make a clone for the request
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Nabil ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
