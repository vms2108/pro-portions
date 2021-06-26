import { RolesEnum } from '../enums/roles.enum';

export interface UserJson {
  token: string;
  email: string;
  roles: RolesEnum[];
  refreshToken: string;
  username: string;
  clientId: string;
  endTime: number;
  accessToken: string;
}
