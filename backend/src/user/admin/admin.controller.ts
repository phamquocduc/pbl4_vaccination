import { Controller, Get } from "@nestjs/common";
import { UserServices } from "../user.services";
import { Roles } from "src/auth/decorators/role.decorator";
import { ERole } from "src/enums/role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('admin')
@Roles(ERole.ADMIN)
@Controller('admin')
export class AdminController{
    constructor(private readonly userServices: UserServices){}

    @Get('users')
    async getAllUser(){
        return this.userServices.findAll()
    }
}