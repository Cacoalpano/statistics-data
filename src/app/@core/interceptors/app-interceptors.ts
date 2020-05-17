import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthenticationService } from '../services/common/authentication.service';
import { LoadingService } from '../services/common/loading.service';
import { MessageService } from '../services/common/message.service';
import { RequestOptions, InterceptorHttpParams } from '../services/common/http.service';
@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly messageService: MessageService,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestOptions: RequestOptions;
    req.params instanceof InterceptorHttpParams ? (requestOptions = req.params.options) : (requestOptions = {});

    if (!requestOptions.hideLoading) {
      // show loader
      this.loadingService.show();
    }
    // add headers
    let headers = req.headers;
    if ((req.method.toLowerCase() === 'post' || req.method.toLowerCase() === 'put') && !(req.body instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }
    const accessToken = this.authenticationService.getAccessToken();
    if (!!accessToken) {
      headers = headers.set('Authorization', 'Bearer' + ' ' + accessToken);
    }
    req = req.clone({ headers });
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse && !requestOptions.ignoreError) {
          this.handleError(error, requestOptions);
        }
        return throwError(error);
      }),
    );
  }
  handleError(error: HttpErrorResponse, requestOptions: RequestOptions) {
    switch (error.status) {
      case 400:
        // this.messageService.updateMessage({ key: 'common.MES_ERROR400', type: 'danger' });
        break;
      case 401:
        this.router.navigate(['/login']);
        // this.messageService.updateMessage({ key: 'common.MES_ERROR401', type: 'danger' });
        break;
      default:
        this.loadingService.hide();
        if (!requestOptions.ignoreUnknowError) {
          // this.messageService.updateMessage({ key: 'common.MES_ALERT', type: 'danger' });
        }
    }
  }
}
