import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { VaccinationcenterServices } from './vaccination-center.services';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VaccinationCenter } from './vaccination-center.entity';
import { VaccinationCenterCreateDto } from './dto/vaccination-center-create.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { ERole } from 'src/enums/role.enum';
import { Public } from 'src/auth/decorators/public.decorator';
import { VaccinationCenterUpdateDto } from './dto/vaccination-center-update.dto';
import { VaccineInventoryUpdateDto } from 'src/vaccine-inventory/dto/vaccine-inventory-update.dto';
import { VaccineInventoryServices } from 'src/vaccine-inventory/vaccine-inventory.services';
import { VaccineInventory } from 'src/vaccine-inventory/vaccine-inventory.entity';

@ApiBearerAuth()
@ApiTags('vaccination-center')
@Controller('vaccination-center')
export class VaccinationcenterController {
    constructor(
        private readonly vaccinationCenterSevices: VaccinationcenterServices,
        private readonly vaccineInventorySevices: VaccineInventoryServices
    ) {}

    @Roles([ERole.ADMIN])
    @Post()
    async create(
        @Body() createDto: VaccinationCenterCreateDto
    ): Promise<VaccinationCenter> {
        return this.vaccinationCenterSevices.createVaccinationCenter(createDto);
    }

    @Public()
    @Get()
    async getAllVaccinationCenter(): Promise<VaccinationCenter[] | null> {
        return this.vaccinationCenterSevices.getAll();
    }

    @Public()
    @Get(':id')
    async getOneById(
        @Param('id') id: string
    ): Promise<VaccinationCenter | null> {
        return this.vaccinationCenterSevices.getById(Number.parseInt(id));
    }

    @Roles([ERole.ADMIN])
    @Put('update/:id')
    async update(
        @Body() updateDto: VaccinationCenterUpdateDto,
        @Param('id') id: string
    ): Promise<VaccinationCenter> {
        return this.vaccinationCenterSevices.updateVaccinationCenterById(
            updateDto,
            Number.parseInt(id)
        );
    }

    @Roles([ERole.ADMIN])
    @Put('update-inventory/:id')
    async updateInventory(
        @Body() updateDto: VaccineInventoryUpdateDto,
        @Param('id') id: string
    ): Promise<VaccineInventory> {
        const center = await this.vaccinationCenterSevices.getById(
            Number.parseInt(id)
        );

        return this.vaccineInventorySevices.updateById(
            center.vaccineinventory.id,
            updateDto
        );
    }

    @Roles([ERole.ADMIN])
    @Delete('delete/:id')
    async deleteByid(@Param('id') id: string): Promise<VaccinationCenter> {
        return this.vaccinationCenterSevices.deleteVaccinationCenterById(
            Number.parseInt(id)
        );
    }
}
