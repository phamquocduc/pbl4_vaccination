import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VaccineInventory } from "./vaccine-inventory.entity";

@Injectable()
export class VaccineinventoryRepository{
    constructor(
        @InjectRepository(VaccineInventory)
        private vaccineinventoryRepository: Repository<VaccineInventory>
    ){}

    // async save(createDto : UserCreateDto) : Promise<User | null>{
    //     const newUser = this.userRepository.create(createDto)
    //     return await this.userRepository.save(newUser)
    // }

    // async findOneByEmail(email: string): Promise<User | null>{

    //     const user = await this.userRepository.findOne({where: {email}})
    //     if(!user) throw new CustomAppException(ExceptionEnum.USER_NOT_EXIT, HttpStatus.BAD_REQUEST)

    //     return user
    // }

    // async findById(id: string): Promise<User | null>{

    //     const user  = await this.userRepository.findOneBy({id})
    //     if(!user) throw new CustomAppException(ExceptionEnum.USER_NOT_EXIT, HttpStatus.BAD_REQUEST)

    //     return user
    // }
}