import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { ERole } from 'src/enums/role.enum';
import { VaccinationcenterServices } from 'src/vaccination-center/vaccination-center.services';

@Injectable()
export class UserAdminServices implements OnModuleInit {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly centerServices: VaccinationcenterServices
    ) {}

    async onModuleInit() {
        const adminUser = await this.userRepository.findAdminByRole();

        log(adminUser);

        if (!adminUser) {
            const newAdminUser = await this.userRepository.create({
                email: 'admin@gmail.com',
                passWord: 'admin123',
            });

            newAdminUser.role = ERole.ADMIN;

            await this.userRepository.create(newAdminUser);

            log(newAdminUser);

            const centers = await this.centerServices.getAll();

            for (let center of centers) {
                const newStaffUser = await this.userRepository.create({
                    email: `staff${center.id}@gmail.com`,
                    passWord: '12345678',
                });

                newStaffUser.role = ERole.STAFF;

                await this.userRepository.create(newStaffUser);
            }
        }
    }
}
