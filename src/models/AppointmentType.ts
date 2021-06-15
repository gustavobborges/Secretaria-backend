import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Appointment from './Appointment';

@Entity('appointmentTypes')
class AppointmentType {
   
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @OneToMany(() => Appointment, appointment => appointment.appointmentType)
    appointments: Appointment[];

    @Column()
    name: String;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}

export default AppointmentType;