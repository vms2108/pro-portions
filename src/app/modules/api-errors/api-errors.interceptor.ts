import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_ERRORS } from 'src/app/modules/api-errors/api-errors.token';
import { NotificationsService } from 'src/app/ui/notifications/notifications.service';

export interface APIErrorResponse {
  code?: string;
  debugMsg?: string;
}

@Injectable()
export class ApiErrorsInterceptor implements HttpInterceptor {

  constructor(
    private notificationsService: NotificationsService,
    @Inject(API_ERRORS) private apiErrors: Map<string, string>,
  ) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        map(event => event),
        catchError((error: HttpErrorResponse) => {
          this.displayMessageIfError(error);

          return throwError(error);
        }),
      );
  }

  private displayMessageIfError(response: HttpErrorResponse): void {
    const error = <APIErrorResponse> response.error;
    const message = this.apiErrors.get(error.code || '') || error!.debugMsg || 'Неизвестная ошибка.';
    this.notificationsService.error(message);
  }

}
