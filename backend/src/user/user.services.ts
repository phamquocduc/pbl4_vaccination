import { HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { UserCreateDto } from "./dto/user-create.dto";
import { UserRepository } from "./user.repository";
import { CustomAppException } from "src/exceptions/custom-app.exceptions";
import { createExceptionMessage, ExceptionEnum } from "src/enums/exception.enum";
import { UserUpdateDto } from "./dto/user-update.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import * as bcrypt from 'bcrypt'
import { VaccinationprofileServices } from "src/vaccination-profile/vaccination-profile.services";
import { VaccinationProfileCreateDto } from "src/vaccination-profile/dto/vaccination-profile-create.dto";
import { ERelationship } from "src/enums/relationship.enum";
import { VaccinationProfileBaseCreateDto } from "src/vaccination-profile/dto/vaccination-profileBase-create.dto";
import { log } from "console";
import { UpdateVaccinationProfileDto } from "src/vaccination-profile/dto/vaccination-profile-update.dto";

@Injectable()
export class UserServices{
    constructor(
        private userRepository: UserRepository,
        private vaccinationProfileService: VaccinationprofileServices
    ){}

    async create(createDto : UserCreateDto) : Promise<User>{
        const {passWord, confirmPassWord} = createDto

        this.comparePasswordAndConfirmPassword(passWord, confirmPassWord)

        const newUser = await this.userRepository.create(createDto)
        
        const User = await this.userRepository.findById(newUser.id)
    

        const vaccinationProfileDto: VaccinationProfileBaseCreateDto = {
            fullName: newUser.firstName + ' ' + newUser.lastName,
            relationship: ERelationship.SELF,
            email: newUser.email
        }

        const profile = await this.vaccinationProfileService.create(
            {
                ...new VaccinationProfileCreateDto(),
                ...vaccinationProfileDto
            },
            User
        )
        
        return newUser
    }

    async update(updateDto : UserUpdateDto, userId: string) : Promise<User>{

        let user = await this.userRepository.findById(userId)

        Object.assign(user, updateDto)
       
        return await this.userRepository.update(user)
    }

    async updateProfileById(userId: string, profileId: number, updateDto : UpdateVaccinationProfileDto) : Promise<any>{

        const user = await this.userRepository.findById(userId)

        const listProfile = user.vaccinationProfiles

        let check = listProfile.find((currElement) => {
            if(currElement.id === profileId ){

                if(currElement.relationship === ERelationship.SELF)
                    Object.assign(updateDto, { 
                        email: user.email,
                        relationship: ERelationship.SELF
                    })

                return true
            }
        })

        if(!check){
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.PROFILE_NOT_EXIT), HttpStatus.BAD_REQUEST)
        }
       
        return await this.vaccinationProfileService.updateProfileById(profileId, updateDto)
    }

    async changePassword(changePasswordDto : ChangePasswordDto, userId: string) : Promise<User>{

        const { currPassword, newPassword, confirmNewPassword } = changePasswordDto

        let user = await this.userRepository.findById(userId)

        const isMatch = await bcrypt.compare(currPassword, user.passWord)

        if(!isMatch){
            throw new CustomAppException(createExceptionMessage(ExceptionEnum.CURR_PASSWORD_INVALID), HttpStatus.BAD_REQUEST)
        }

        this.comparePasswordAndConfirmPassword(newPassword, confirmNewPassword)

        user.passWord = await bcrypt.hash(newPassword, 10)
       
        return await this.userRepository.update(user)
    }

    async findOneByEmail(email: string): Promise<User>{
        return await this.userRepository.findOneByEmail(email)
    }

    async findById(id: string): Promise<User>{
        return await this.userRepository.findById(id)
    }

    private comparePasswordAndConfirmPassword(passWord: string, confirmPassWord: string){
        if(passWord !== confirmPassWord){
            throw new CustomAppException(
                createExceptionMessage(ExceptionEnum.CONFIRM_PASSWORD_NOT_MATCH), 
                HttpStatus.BAD_REQUEST
            )
        }
    }
}
