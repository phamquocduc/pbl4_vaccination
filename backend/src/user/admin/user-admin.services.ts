import { Injectable, OnModuleInit } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import * as bcrypt from "bcrypt"
import { log } from "console";
import { ERole } from "src/enums/role.enum";

@Injectable()
export class UserAdminServices implements OnModuleInit{
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async onModuleInit() {
        const adminUser = await this.userRepository.findAdminByRole();

        log(adminUser)
        
            if (!adminUser) { 
            const newAdminUser = await this.userRepository.create({
                email: 'admin@gmail.com',
                passWord: 'admin123',
            });

            newAdminUser.role = ERole.ADMIN

            await this.userRepository.create(newAdminUser)

            log(newAdminUser)
        }
    }

    
}