import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { VaccinationProfile } from "src/vaccination-profile/vaccination-profile.entity";
import { VaccineReservation } from "src/vaccine-reservation/vaccine-reservation.entity";
import { VaccineCart } from "src/vaccine-cart/vaccine-cart.entity";
import { ERole } from "src/enums/role.enum";

@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column(
        {default: null}
    )
    firstName: string

    @Column(
        {default: null}
    )
    lastName: string

    @Column({unique : true})
    email: string

    @Column()
    passWord: string

    @Column(
        {
            nullable: false,
            type: 'enum',
            enum: ERole,
            default: ERole.USER
        }
    )
    role: ERole
    
    @BeforeInsert()
    async hashPassword(){
        this.passWord = await bcrypt.hash(this.passWord, 10) 
    }

    @Column({default : true})
    isActive: boolean

    @OneToMany(() => VaccinationProfile, 
        vaccinationProfile => vaccinationProfile.user
    )
    vaccinationProfiles: VaccinationProfile[]

    @OneToMany(() => VaccineReservation, 
        vaccineReservation => vaccineReservation.user
    )
    vaccineReservation: VaccineReservation[]

    @OneToOne(() => VaccineCart, vaccineCart => vaccineCart.user)
    vaccineCart: VaccineCart
}