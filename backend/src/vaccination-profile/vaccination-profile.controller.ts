import { Body, Controller, HttpStatus, Post, Request, UseFilters } from "@nestjs/common";
import { VaccinationprofileServices } from "./vaccination-profile.services";
import { VaccinationProfile } from "./vaccination-profile.entity";
import { VaccinationProfileCreateDto } from "./dto/vaccination-profile-create.dto";
import { UserServices } from "src/user/user.services";
import { CustomAppException } from "src/exceptions/custom-app.exceptions";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";
import { DuplicatePropertiesFilter } from "src/filters/dulicate-properties.filters";
import { log } from "console";
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('vaccination-profile')
@Controller('vaccination-profile')
export class VaccinationprofileController{
    constructor(
        private readonly vaccinationprofileSevices: VaccinationprofileServices,
        private readonly userServices: UserServices
    ){}

    // @Public()
    // @Get()
    // getString() : string{
    //     return 'hello world'
    // }

    // @Get(':id')
    // async findOneById(@Param('id') id: string, @Request() req: any){
    //     log(req['user'])
    //     return this.userSevices.findById(id)
    // }

    @Post()
    @UseFilters(DuplicatePropertiesFilter)
    async create(@Body() createProfileRequest: VaccinationProfileCreateDto, @Request() req: any): Promise<VaccinationProfile>{
       
       const user = await this.userServices.findById(req['user'].sub)

       log(req['user'].sub)

       return this.vaccinationprofileSevices.create(createProfileRequest, user)
    }
}