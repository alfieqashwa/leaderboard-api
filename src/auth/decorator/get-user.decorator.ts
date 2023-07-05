import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx
      .switchToHttp()
      .getRequest()
    if (data) {
      return request.user[data]
    }
    console.log(`REQQUEST::: `, request.user);
    return request.user
  }
)