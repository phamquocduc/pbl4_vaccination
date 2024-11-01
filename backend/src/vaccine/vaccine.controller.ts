import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { VaccineServices } from "./vaccine.services";
import { VaccineCreateDto } from "./dto/vaccinae-create.dto";
import { Vaccine } from "./vaccine.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/role.decorator";
import { ERole } from "src/enums/role.enum";
import { VaccineDescriptionUpdateDto } from "src/vaccine-descrpition/dto/vaccine-description-update.dto";
import { VaccineDescription } from "src/vaccine-descrpition/vaccine-descrpition.entity";
import { VaccineUpdateDto } from "./dto/vaccine-update.dto";
import { Public } from "src/auth/decorators/public.decorator";

@ApiBearerAuth()
@ApiTags('vaccine')
@Controller('vaccine')
export class VaccineController{
    constructor(
        private readonly vaccineSevices: VaccineServices
    ){}

    @Public()
    @Get()
    async getAllVaccine(): Promise<Vaccine[] | null>{
        return this.vaccineSevices.getAllVaccine()
    }

    @Public()
    @Get(':id')
    async getVaccineById(@Param('id') id: string): Promise<Vaccine | null>{
        return this.vaccineSevices.getOneById(Number.parseInt(id))
    }

    @Roles(ERole.ADMIN)
    @Post()
    async create(@Body() createDto: VaccineCreateDto): Promise<Vaccine>{
        return this.vaccineSevices.createVaccin(createDto)
    }

    @Roles(ERole.ADMIN)
    @Put('update/:id')
    async update(@Param('id') id: string, @Body() updateDto: VaccineUpdateDto): Promise<Vaccine>{
        return this.vaccineSevices.updateVaccine(Number.parseInt(id), updateDto)
    }

    @Roles(ERole.ADMIN)
    @Put('update/vaccine-description/:id')
    async updateVaccineDescription(@Param('id') id: string, @Body() updateDto: VaccineDescriptionUpdateDto): Promise<VaccineDescription>{
        return this.vaccineSevices.updateVaccineDescription(Number.parseInt(id), updateDto)
    }

    @Roles(ERole.ADMIN)
    @Delete('delete/:id')
    async daleteVaccine(@Param('id') id: string): Promise<any>{
        return this.vaccineSevices.deleteVaccine(Number.parseInt(id))
    }
}