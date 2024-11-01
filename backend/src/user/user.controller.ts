import { Body, Controller, Get, Param, Post, Put, Request, UseFilters } from "@nestjs/common";
import { UserServices } from "./user.services";
import { UserCreateDto } from "./dto/user-create.dto";
import { User } from "./user.entity";
import { DuplicatePropertiesFilter } from "src/filters/dulicate-properties.filters";
import { Public } from "src/auth/decorators/public.decorator";
import { UserUpdateDto } from "./dto/user-update.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { VaccinationprofileServices } from "src/vaccination-profile/vaccination-profile.services";
import { UpdateVaccinationProfileDto } from "src/vaccination-profile/dto/vaccination-profile-update.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController{
    constructor(
      private readonly userSevices: UserServices,
      private readonly vaccinationProfileSevices: VaccinationprofileServices,
    ){}

    @Get()
    async getProfile(@Request() req: any){
        const id = req['user'].sub
        return this.userSevices.findById(id)
    }

    @Get('vaccination-profiles')
    async getAllVaccinationProfile(@Request() req: any){
        const id = req['user'].sub
        return this.vaccinationProfileSevices.getAllProfileByUserid(id)
    }

    @Public()
    @Post()
    @UseFilters(DuplicatePropertiesFilter)
    async create(@Body() createUserRequest: UserCreateDto): Promise<User>{
       return this.userSevices.create(createUserRequest)
    }

    @Put('update')
    @UseFilters(DuplicatePropertiesFilter)
    async update(@Body() updateUserRequest: UserUpdateDto, @Request() req: any): Promise<User>{
       const userId = req['user'].sub
       return this.userSevices.update(updateUserRequest, userId)
    }

    @Put('change-password')
    async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req: any): Promise<User>{
       const userId = req['user'].sub
       return this.userSevices.changePassword(changePasswordDto, userId)
    }

    @Put('update-vaccination-profile/:id')
    async updateProfileById(
      @Body() updateProfileDto: UpdateVaccinationProfileDto, 
      @Param('id') id: string,
      @Request() req: any
    ): Promise<any>{
       const userId = req['user'].sub
       return this.userSevices.updateProfileById(userId, Number.parseInt(id), updateProfileDto)
    }
}