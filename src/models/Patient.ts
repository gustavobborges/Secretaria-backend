import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';

import Appointment from './Appointment';

@Entity('patients')
class Patient {
   
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Appointment, appointment => appointment.patient)
    appointments: Appointment[];

    @Column()
    name: String;

    @Column()
    phone: String;

    @Column()
    record: String;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}

export default Patient;