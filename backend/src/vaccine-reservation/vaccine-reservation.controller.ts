import { Controller } from "@nestjs/common";
import { VaccineReservationServices } from "./vaccine-reservation.services";

@Controller('user')
export class VaccineReservationController{
    constructor(
        private readonly vaccineReservationSevices: VaccineReservationServices
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

    // @Public()
    // @Post()
    // @UseFilters(DuplicatePropertiesFilter)
    // async create(@Body() createUserRequest: UserCreateDto): Promise<User>{
    //    return this.userSevices.create(createUserRequest)
    // }
}