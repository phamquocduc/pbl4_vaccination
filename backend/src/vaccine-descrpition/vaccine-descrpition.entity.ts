import { Vaccine } from "src/vaccine/vaccine.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity()
export class VaccineDescription {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dosage: string;  

  @Column()
  injectionRoute: string;  

  @Column()
  recommendedAgeGroup: string;  

  @Column()
  schedule: string;  

  @Column()
  adverseEffects: string;  

  @Column()
  storage: string;  

  @Column()
  detailedDescription: string;  

  @OneToOne(() => Vaccine)
  vaccine: Vaccine
}
