import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { VaccinationcenterServices } from "./vaccination-center.services";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { VaccinationCenter } from "./vaccination-center.entity";
import { VaccinationCenterCreateDto } from "./dto/vaccination-center-create.dto";
import { Roles } from "src/auth/decorators/role.decorator";
import { ERole } from "src/enums/role.enum";
import { Public } from "src/auth/decorators/public.decorator";
import { VaccinationCenterUpdateDto } from "./dto/vaccination-center-update.dto";

@ApiBearerAuth()
@ApiTags('vaccination-center')
@Controller('vaccination-center')
export class VaccinationcenterController{
    constructor(
        private readonly vaccinationcenterSevices: VaccinationcenterServices
    ){}

    @Roles(ERole.ADMIN)
    @Post()
    async create(@Body() createDto: VaccinationCenterCreateDto): Promise<VaccinationCenter>{
        return this.vaccinationcenterSevices.createVaccinationCenter(createDto)
    }

    @Public()
    @Get()
    async getAllVaccinationCenter(): Promise<VaccinationCenter[] | null>{
        return this.vaccinationcenterSevices.getAll()
    }

    @Public()
    @Get(':id')
    async getOneById(@Param('id') id: string): Promise<VaccinationCenter | null>{
        return this.vaccinationcenterSevices.getById(Number.parseInt(id))
    }

    @Roles(ERole.ADMIN)
    @Put('update/:id')
    async update(@Body() updateDto: VaccinationCenterUpdateDto,@Param('id') id: string): Promise<VaccinationCenter>{

        return this.vaccinationcenterSevices.updateVaccinationCenterById(updateDto, Number.parseInt(id))
    }

    @Roles(ERole.ADMIN)
    @Delete('delete/:id')
    async deleteByid(@Param('id') id: string): Promise<VaccinationCenter>{

        return this.vaccinationcenterSevices.deleteVaccinationCenterById(Number.parseInt(id))
    }
}