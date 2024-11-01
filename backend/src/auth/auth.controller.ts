import { Body, Controller, Post, Request } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthServices } from "./auth.services";
import { Public } from "./decorators/public.decorator";
import { log } from "console";

@Controller('auth')
export class AuthController{
    constructor(private authServices: AuthServices){}

    @Public()
    @Post('login')
    async logIn(@Body() loginDto: LoginDto){
        return this.authServices.login(loginDto.email, loginDto.password)
    }
}