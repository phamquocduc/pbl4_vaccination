import { Injectable } from "@nestjs/common";
import { VaccineinventoryRepository } from "./vaccine-inventory.repository";

@Injectable()
export class VaccineInventoryServices{
    constructor(
        private vaccineInventoryRepository: VaccineinventoryRepository
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
