import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinTable } from 'typeorm';

import Appointment from './Appointment';
import User from './User';


@Entity('patients')
class Patient {
   
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Appointment, appointment => appointment.patient)
    appointments: Appointment[];

    @ManyToOne(() => User, user => user.patients)
    user: User;
    nullable: true

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