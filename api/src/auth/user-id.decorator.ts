import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserId = createParamDecorator(
    (data: any, ctx: ExecutionContext) => {
        const user = (ctx as any).user;
        const loggedUserId = user.id; 
    
        return loggedUserId;
    },
);
