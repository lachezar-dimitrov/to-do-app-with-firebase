import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { JwtPayload } from "src/common/jwt-payload";
import { UserRole } from "src/common/enums/user-role";
import { Token } from "src/models/token.entity";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
        private readonly jwtService: JwtService,
    ) { }

    async findUserByName(username: string) {
        return await this.userRepository.findOne({
            where: {
                username,
                isDeleted: false,
            }
        });
    }

    async blacklist(token: string) {
      const tokenEntity = this.tokenRepository.create();
      tokenEntity.token = token;
  
      await this.tokenRepository.save(tokenEntity)
    }  

    async isBlacklisted(token: string): Promise<boolean> {
      return Boolean(await this.tokenRepository.findOne({
        where: {
          token,
        }
      }));
    }
    
    async validateUser(username: string, password: string) {
        const user = await this.findUserByName(username);
        if (!user) {
          return null;
        }
    
        const isUserValidated = await bcrypt.compare(password, user.password);
        return isUserValidated
          ? user
          : null;
      }

      async login(username: string, password: string) {
        const user = await this.validateUser(username, password);
    
        if (!user) {
          throw new UnauthorizedException(`Wrong credentials!`);
        }
    
        const payload: JwtPayload = {
          id: user.id,
          username: user.username,
          role: UserRole[user.role],
        };
    
        const token = await this.jwtService.signAsync(payload);
    
        return {
          token,
        };
      }
    
}