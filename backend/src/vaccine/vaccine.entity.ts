import { VaccineInventory } from "src/vaccine-inventory/vaccine-inventory.entity";
import { VaccineDescription } from "../vaccine-descrpition/vaccine-descrpition.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { VaccinationAppointment } from "src/vaccination-appointment/vaccination-appointment.entity";
import { VaccineReservation } from "src/vaccine-reservation/vaccine-reservation.entity";
import { VaccineCart } from "src/vaccine-cart/vaccine-cart.entity";

@Entity()
export class Vaccine {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  

  @Column()
  origin: string; 
  
  @Column()
  type: string;

  @Column()
  effect: string; 

  @Column()
  availableDoses: number;

  @Column()
  doseNumber: number

  @Column()
  durationIntervals: number

  @Column('json', 
    {
      nullable: true
    }
  )
  images: string[]

  @Column({
    type: 'bigint',
    transformer: {
      to: (value: number) => value,             
      from: (value: string) => parseInt(value),
    }
  })
  price: number;  

  @ManyToMany(() => VaccineInventory, 
    vaccineinventorys => vaccineinventorys.vaccines
  )
  @JoinTable()
  vaccineinventorys: VaccineInventory[]

  @OneToOne(() => VaccineDescription, 
    description => description.vaccine,
    {cascade: true}
  )
  @JoinColumn()
  description: VaccineDescription;  

  @OneToMany(() => VaccineReservation,
    vaccineReservations => vaccineReservations.vaccine
  )
  vaccineReservations: VaccineReservation[]

  @ManyToMany(() => VaccineCart, vaccineCarts => vaccineCarts.vaccines)
  vaccineCarts: VaccineCart[]
}
