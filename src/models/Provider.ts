import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';

import User from './User';
import Appointment from './Appointment';
import Patient from './Patient';

@Entity('providers')
class Provider {
   
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @OneToMany(() => Appointment, appointment => appointment.provider)
    appointments: Appointment[];
    
    @Column()
    name: String;
    
    @ManyToMany(() => User)
    @JoinTable({name: "providers_users"})
    users: User[];

    @ManyToMany(() => Patient)
    @JoinTable({name: "providers_patients"})
    patients: Patient[]
    
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}

export default Provider;