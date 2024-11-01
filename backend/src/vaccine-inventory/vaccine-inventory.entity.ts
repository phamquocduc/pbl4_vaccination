import { VaccinationCenter } from "../vaccination-center/vaccination-center.entity";
import { Vaccine } from "../vaccine/vaccine.entity";
import { Entity, PrimaryGeneratedColumn, ManyToMany, OneToOne, JoinColumn, Column } from "typeorm";

@Entity()
export class VaccineInventory {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  // Tên kho

  @Column()
  capacity: number;

  @OneToOne(() => VaccinationCenter, 
    vaccinationCenter => vaccinationCenter.vaccineinventory
  )
  @JoinColumn()
  vaccinationCenter: VaccinationCenter;  // Trung tâm

  @ManyToMany(() => Vaccine,
    vaccines => vaccines.vaccineinventorys
  )
  vaccines: Vaccine[];  // Loại vắc-xin
}
