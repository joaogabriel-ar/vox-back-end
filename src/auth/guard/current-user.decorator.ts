import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IAuthUser } from "src/interfaces/authUser.interface";

export default createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    return request.user as IAuthUser;
})