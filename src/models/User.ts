import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, UpdateDateColumn, ManyToOne } from 'typeorm';

import Appointment from './Appointment';
import Patient from './Patient';

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: String;

    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments: Appointment[];

    @OneToMany(() => Patient, patient => patient.user)
    patients: Patient[];

    @Column()
    name: String;

    @Column()
    email: String;

    @Column()
    password: String;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}

export default User;