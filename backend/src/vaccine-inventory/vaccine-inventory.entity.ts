import { VaccinationCenter } from "../vaccination-center/vaccination-center.entity";
import { Vaccine } from "../vaccine/vaccine.entity";
import { Entity, PrimaryGeneratedColumn, ManyToMany, OneToOne, JoinColumn, Column } from "typeorm";

@Entity()
export class VaccineInventory {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;  

  @Column({nullable: true})
  capacity: number;

  @OneToOne(() => VaccinationCenter, 
    vaccinationCenter => vaccinationCenter.vaccineinventory,
    {nullable: false}
  )
  @JoinColumn()
  vaccinationCenter: VaccinationCenter;  

  @ManyToMany(() => Vaccine,
    vaccines => vaccines.vaccineinventorys
  )
  vaccines: Vaccine[];  
}
