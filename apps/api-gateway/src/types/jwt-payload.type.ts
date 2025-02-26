import { UserType } from '@app/shared-types';

export interface JwtPayloadType {
  sub: string;
  user: UserType;
}
