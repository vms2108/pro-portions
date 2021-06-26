import { Injectable } from '@angular/core';

import { RolesEnum } from '../enums/roles.enum';
import { UserJson } from '../json/user.json-interface';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserModelsFactory {

  public createUser(
    token: string,
    email: string,
    roles: Set<RolesEnum>,
    refreshToken: string,
    username: string,
    clientId: string,
    endTime: number,
    accessToken: string,
  ): User {
    return new User(token, email, roles, refreshToken, username, clientId, endTime, accessToken);
  }

  public createUserFromJson(json: UserJson): User {
    return new User(
      json.token,
      json.email,
      this.createSetFromArray(json.roles),
      json.refreshToken,
      json.username,
      json.clientId,
      json.endTime,
      json.accessToken,
    );
  }

  public createSetFromArray(roles: RolesEnum[]): Set<RolesEnum> {
    return new Set(roles);
  }
}
