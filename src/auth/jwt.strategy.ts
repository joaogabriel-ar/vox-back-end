import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: JwtStrategy.extractJWTFromCookie,
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET")
        });
    }

    private static extractJWTFromCookie(req: Request): string | null {

        if (req.cookies && req.cookies.access_token) {
            return req.cookies.access_token;
        }

        return null;
    }

    async validate(payload: any) {
        return { id: payload.id, name: payload.name, email: payload.email };
    }
}