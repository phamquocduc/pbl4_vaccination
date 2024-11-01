import { Injectable } from "@nestjs/common";
import { VaccinereservationRepository } from "./vaccine-reservation.repository";

@Injectable()
export class VaccineReservationServices{
    constructor(
        private vaccineReservationRepository: VaccinereservationRepository
    ){}

    // async create(createDto : UserCreateDto) : Promise<User>{
    //     const {passWord, confirmPassWord} = createDto

    //     if(passWord !== confirmPassWord){
    //         throw new CustomAppException(
    //             createExceptionMessage(ExceptionEnum.CONFIRM_PASSWORD_NOT_MATCH), 
    //             HttpStatus.BAD_REQUEST
    //         )
    //     }
    //     return await this.userRepository.save(createDto)
    // }

    // async findOneByEmail(email: string): Promise<User>{
    //     return await this.userRepository.findOneByEmail(email)
    // }

    // async findById(id: string): Promise<User>{
    //     return await this.userRepository.findById(id)
    // }
}
