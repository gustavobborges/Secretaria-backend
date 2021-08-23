import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

import Provider from './Provider';
import Patient from './Patient';
import AppointmentType from './AppointmentType';

@Entity('appointments')
class Appointment {
   
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @ManyToOne(() => Provider, provider => provider.appointments)
    provider: Provider;

    @ManyToOne(() => Patient, patient => patient.appointments)
    patient: Patient;

    @ManyToOne(() => AppointmentType, appointmentType => appointmentType.appointments)
    appointmentType: AppointmentType;
    
    @Column()
    name: String;

    @Column()
    place: String;

    @Column()
    description: String;

    @Column()
    initialDate: Date;

    @Column()
    finalDate: Date;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;