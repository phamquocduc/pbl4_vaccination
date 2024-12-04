import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import e, { Request } from 'express';
import { jwtConstants } from './auth.constants';
import { log } from 'console';
import { ERole } from 'src/enums/role.enum';
import { ROLES_KEY } from './decorators/role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtSefvices: JwtService,
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()]
        );

        const roles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        console.log(roles);

        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        try {
            const payload = await this.jwtSefvices.verifyAsync(token, {
                secret: jwtConstants.secretKey,
            });

            if (
                roles &&
                !roles.find((currElement) => currElement === payload.role)
            ) {
                throw new ForbiddenException();
            }

            request['user'] = payload;
        } catch (error) {
            if (error?.response?.statusCode == 403)
                throw new ForbiddenException();

            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
