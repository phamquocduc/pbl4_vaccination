import { HttpStatus, Injectable } from "@nestjs/common";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";
import { CustomAppException } from "src/exceptions/custom-app.exceptions";
import { UserServices } from "src/user/user.services";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { log } from "console";

@Injectable()
export class AuthServices{
    constructor(
        private userServices: UserServices,
        private jwtServices: JwtService
    ){}

    async login(email: string, passWord: string): Promise<{access_token: string}>{
        const user = await this.userServices.findOneByEmail(email)
            
        const valid = await bcrypt.compare(passWord, user.passWord)

        log(valid)

        if(!valid){
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.INCORECT_PASSWORD), HttpStatus.BAD_REQUEST)
        }

        const payload = { sub: user.id, userEmail: user.email, role: user.role }

        return{
            access_token: await this.jwtServices.signAsync(payload)
        }
    }
}