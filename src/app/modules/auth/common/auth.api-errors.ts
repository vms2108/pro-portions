import { Injectable } from '@angular/core';
import { ApiErrorsRecorderBase } from 'src/app/modules/api-errors/api-errors-recorder.base';
import { APIErrors } from 'src/app/modules/api-errors/api-errors.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiErrors extends ApiErrorsRecorderBase {

  protected readonly errors: APIErrors = {
    NotAuthorizedException: 'Неверный логин или пароль.',
    USER_NOT_FOUND: 'Пользователь не найден.',
    PROFILE_BLOCKED: 'Профиль заблокирован.',
  };
}
