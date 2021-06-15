import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import Provider from './Provider';
import Patient from './Patient';
import AppointmentType from './AppointmentType';

@Entity('appointments')
class Appointment {
   
    @PrimaryGeneratedColumn('uuid')
    id: String;

    // @Column()
    // appointmentType_id: String

    // @Column()
    // provider_id: String

    // @Column()
    // patient_id: String

    @ManyToOne(() => AppointmentType)
    @JoinColumn({ name: 'appointmentType_id' })
    appointmentType: AppointmentType | null;

    @ManyToOne(() => Provider)
    @JoinColumn({ name: 'provider_id' })
    provider: Provider | null;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient | null;

    @Column()
    name: String;

    @Column()
    description: String;

    @Column()
    date: String;

    @Column()
    duration: String;

    @Column()
    place: String;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;