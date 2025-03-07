import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserType } from '@app/shared-types';

export const UserContext = createParamDecorator(
  (data: keyof UserType, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserType }>();
    const user = request.user;

    return data ? user && user[data] : user;
  },
);
