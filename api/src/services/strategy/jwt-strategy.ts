import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { jwtConstants } from "src/constants/secret";
import { JwtPayload } from "src/common/jwt-payload";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: JwtPayload) {
        // injects the returned user in the request.user
        const user = await this.authService.findUserByName(payload.username);
    
        if (!user) {
          return;
        }
    
        if (user.banEndDate && user.banEndDate.valueOf() > Date.now()) {
          // user banned, ban hasn't expired yet
          return;
        }
    
        return user;
      }

}