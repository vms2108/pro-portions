import { Injectable } from '@angular/core';
import { ApiErrorsRecorderBase } from 'src/app/modules/api-errors/api-errors-recorder.base';
import { APIErrors } from 'src/app/modules/api-errors/api-errors.interface';

@Injectable()
export class GlobalApiErrors extends ApiErrorsRecorderBase {

  protected readonly errors: APIErrors = {
    SERVICE_UNAVAILABLE: 'Системная ошибка. Сообщите, пожалуйста, администратору.',
    INTERNAL_ERROR: 'Системная ошибка. Сообщите, пожалуйста, администратору.',
    TIMEOUT: 'Системная ошибка. Сообщите, пожалуйста, администратору.',
    NO_TOKEN: 'Системная ошибка. Сообщите, пожалуйста, администратору.',
    TOKEN_EXPIRED: 'Сессия устарела, пройдите авторизацию заново.',
    TOKEN_INVALID: 'Сессия устарела, пройдите авторизацию заново.',
    TOKEN_REVOKED: 'Сессия устарела, пройдите авторизацию заново.',
    VALIDATION_FAILED: 'Недопустимые данные.',
    NOT_FOUND: 'Сущность не найдена.',
    NOT_UNIQUE_IDENTIFIER: 'Идентификатор должен быть уникальным.',
    INVALID_REQUEST: 'Некорректный запрос.',
  };

}
