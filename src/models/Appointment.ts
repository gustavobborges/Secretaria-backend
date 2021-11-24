import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

import User from './User';
import Patient from './Patient';
import AppointmentType from './AppointmentType';

@Entity('appointments')
class Appointment {
   
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @ManyToOne(() => User, user => user.appointments)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Patient, patient => patient.appointments)
    @JoinColumn({ name: 'patientId' })
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
    confirmationStatus: String;

    @Column()
    confirmationSendedDate: Date;

    @Column()
    confirmationResponsedDate: Date;

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