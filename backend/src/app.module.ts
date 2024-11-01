import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { Vaccine } from './vaccine/vaccine.entity';
import { VaccinationCenter } from './vaccination-center/vaccination-center.entity';
import { VaccineInventory } from './vaccine-inventory/vaccine-inventory.entity';
import { VaccinationProfile } from './vaccination-profile/vaccination-profile.entity';
import { VaccineDescription } from './vaccine-descrpition/vaccine-descrpition.entity';
import { VaccineModule } from './vaccine/vaccine.module';
import { VaccinationProfileModule } from './vaccination-profile/vaccination-profile.module';
import { VaccinationCenterModule } from './vaccination-center/vaccination-center.module';
import { VaccineDescriptionModule } from './vaccine-descrpition/vaccine-descrpition.module';
import { VaccineInventoryModule } from './vaccine-inventory/vaccine-inventory.module';
import { VaccinationAppointmentModule } from './vaccination-appointment/vaccination-appointment.module';
import { VaccineReservationModule } from './vaccine-reservation/vaccine-reservation.module';
import { VaccinationAppointment } from './vaccination-appointment/vaccination-appointment.entity';
import { VaccineReservation } from './vaccine-reservation/vaccine-reservation.entity';
import { VaccineCart } from './vaccine-cart/vaccine-cart.entity';
import { VaccineCartModule } from './vaccine-cart/vaccine-cart.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'root',
      database: 'pbl4_vaccination',
      entities: [
        User,
        Vaccine,
        VaccinationCenter,
        VaccineInventory,
        VaccinationProfile,
        VaccineDescription,
        VaccinationAppointment,
        VaccineReservation,
        VaccineCart
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    VaccineModule,
    VaccinationProfileModule,
    VaccinationCenterModule,
    VaccineDescriptionModule,
    VaccineInventoryModule,
    VaccinationAppointmentModule,
    VaccineReservationModule,
    VaccineCartModule
  ],
  controllers: [],
  providers: [
    JwtService
  ],
})
export class AppModule {}
