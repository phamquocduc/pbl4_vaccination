import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.services";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./auth.constants";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secretKey,
            signOptions: {
                expiresIn: '3600s'
            }
        })
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        AuthServices
    ]
})
export class AuthModule{}