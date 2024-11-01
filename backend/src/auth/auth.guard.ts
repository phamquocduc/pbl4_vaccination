import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "./decorators/public.decorator";
import { Request } from "express";
import { jwtConstants } from "./auth.constants";
import { log } from "console";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwtSefvices: JwtService,
        private reflector: Reflector
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if(isPublic) return true

        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if(!token) throw new UnauthorizedException()

        try {
            const payload = await this.jwtSefvices.verifyAsync(token, {
                secret: jwtConstants.secretKey
            })

            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException()
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}