import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { VaccineReservation } from 'src/vaccine-reservation/vaccine-reservation.entity';
import { ERelationship } from 'src/enums/relationship.enum';
import { EGender } from 'src/enums/gender.enum';

@Entity()
export class VaccinationProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    fullName: string;

    @Column({
        type: 'enum',
        enum: ERelationship,
        nullable: false,
    })
    relationship: ERelationship;

    @Column({ nullable: true })
    dateOfBirth: Date;

    @Column({
        nullable: true,
        type: 'enum',
        enum: EGender,
    })
    gender: EGender;

    @Column({ nullable: true })
    phone: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: true })
    address: string;

    @Column({ default: false })
    isDeleted: boolean;

    @ManyToOne(() => User, (user) => user.vaccinationProfiles, {
        nullable: true,
    })
    user: User;

    @OneToMany(
        () => VaccineReservation,
        (vaccineReservation) => vaccineReservation.profile,
        { nullable: true }
    )
    vaccineReservation: VaccineReservation[];
}
