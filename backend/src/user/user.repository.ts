import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserCreateDto } from "./dto/user-create.dto";
import { CustomAppException } from "src/exceptions/custom-app.exceptions";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";
import { log } from "console";
import { UserUpdateDto } from "./dto/user-update.dto";
import { ERole } from "src/enums/role.enum";
import { CloudinaryResponse } from "src/cloudinary/cloudinary-response";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async create(createDto : UserCreateDto) : Promise<User | null>{
        const newUser = this.userRepository.create(createDto)
        return await this.userRepository.save(newUser)
    }

    async update(updateUser : User) : Promise<User | null>{
        return await this.userRepository.save(updateUser)
    }

    async updateAvatar(avatar: string, userId: string) : Promise<User>{

        let user = await this.userRepository.findOne({
            where: {id: userId}
        })

        if(!user)
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.USER_NOT_EXIT), HttpStatus.BAD_REQUEST)

        Object.assign(user, {avatar: avatar})
       
        return await this.userRepository.save(user)
    }

    async findOneByEmail(email: string): Promise<User | null>{

        const user = await this.userRepository.findOne({
            where: {email: email}
        })

        if(!user) throw new CustomAppException(createExceptionMessage(ExceptionEnum.USER_NOT_EXIT), HttpStatus.BAD_REQUEST)

        return user
    }

    async findById(id: string): Promise<User | null>{

        const user = await this.userRepository.findOne({
          where: { id: id },
          relations: { 
            vaccinationProfiles: true 
          },
        });

        if(!user) throw new CustomAppException(createExceptionMessage(ExceptionEnum.USER_NOT_EXIT), HttpStatus.BAD_REQUEST)

        return user
    }

    async findAdminByRole(): Promise<User | null>{
        const admin = await this.userRepository.findOne({
            where: {role: ERole.ADMIN}
        })

        return admin
    }

    async findAllUser(): Promise<User[] | null>{
        const user = await this.userRepository.find({
            relations: { vaccinationProfiles: true }
        })

        return user
    }

}