import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { UserRole } from "src/common/enums/user-role";
import { User } from "src/models/user.entity";
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        role: UserRole,
    ) {
        this.role = role;
    }

    private role: UserRole;


    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const user = request['user'] as User;

        return user?.role === this.role;
    }
}

