import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { User } from "src/user/user.entity";
import { Vaccine } from "src/vaccine/vaccine.entity";

@Entity()
export class VaccineCart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.vaccineCart)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Vaccine, vaccines => vaccines.vaccineCarts, { cascade: true })
  @JoinTable()
  vaccines: Vaccine[];
}