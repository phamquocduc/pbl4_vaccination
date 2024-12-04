import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinationCenter } from './vaccination-center.entity';
import { VaccinationcenterController } from './vaccination-center.controller';
import { VaccinationcenterRepository } from './vaccination-center.repository';
import { VaccinationcenterServices } from './vaccination-center.services';
import { VaccineInventoryModule } from 'src/vaccine-inventory/vaccine-inventory.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([VaccinationCenter]),
        forwardRef(() => VaccineInventoryModule),
        forwardRef(() => UserModule),
    ],
    controllers: [VaccinationcenterController],
    providers: [VaccinationcenterRepository, VaccinationcenterServices],
    exports: [VaccinationcenterServices],
})
export class VaccinationCenterModule {}
