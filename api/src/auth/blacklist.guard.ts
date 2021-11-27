import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/services/auth.service";

@Injectable()
export class BlacklistGuard extends AuthGuard('jwt') implements CanActivate {

    constructor(
        private readonly authService: AuthService,
    ) {
        super();
    }

    public async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const baseActivation = await super.canActivate(ctx);
        if (!baseActivation) {
            return false;
        }

        const request = ctx.switchToHttp().getRequest();
        const token = request.headers.authorization?.slice(7);

        return !(await this.authService.isBlacklisted(token));
    }

}