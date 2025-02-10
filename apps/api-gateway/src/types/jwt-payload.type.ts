import { UserType } from './user.type';

export interface JwtPayloadType {
  sub: string;
  user: UserType;
}
