import { RolesEnum } from '../enums/roles.enum';

export class User {
  constructor(
    public token: string,
    public email: string,
    public roles: Set<RolesEnum>,
    public refreshToken: string,
    public username: string,
    public clientId: string,
    public endTime: number,
    public accessToken: string,
  ) {}
}
