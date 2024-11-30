import { Vaccine } from "src/vaccine/vaccine.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity()
export class VaccineDescription {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  dosage: string;  

  @Column({nullable: true})
  injectionRoute: string;  

  @Column({nullable: true})
  recommendedAgeGroup: string;  

  @Column({nullable: true})
  schedule: string;  

  @Column({nullable: true})
  adverseEffects: string;  

  @Column({nullable: true})
  storage: string;  

  @Column({nullable: true, type: 'text'})
  detailedDescription: string;  

  @OneToOne(() => Vaccine, vaccine => vaccine.description)
  vaccine: Vaccine
}
