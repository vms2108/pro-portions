import { UserJson } from './user.json-interface';

export interface UserAnswerJson {
  code: string;
  debugMsg: string;
  token: UserJson;
}
