import { Controller, Param, Put } from '@nestjs/common';
import { VaccineReservationServices } from './vaccine-reservation.services';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('reservation')
@Controller('reservation')
export class VaccineReservationController {
    constructor(
        private readonly vaccineReservationSevices: VaccineReservationServices
    ) {}

    @Public()
    @Put('/delete-reservation-timeout/:id')
    async deleteById(@Param('id') id: string) {
        return this.vaccineReservationSevices.deleteById(Number.parseInt(id));
    }

    // @Get(':id')
    // async findOneById(@Param('id') id: string, @Request() req: any){
    //     log(req['user'])
    //     return this.userSevices.findById(id)
    // }

    // @Public()
    // @Post()
    // @UseFilters(DuplicatePropertiesFilter)
    // async create(@Body() createUserRequest: UserCreateDto): Promise<User>{
    //    return this.userSevices.create(createUserRequest)
    // }
}
