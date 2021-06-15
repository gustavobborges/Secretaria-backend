import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';

import Provider from './Provider';

@Entity('patients')
class Patient {
   
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: String;

    @Column()
    whatsCode: String;

    @ManyToMany(() => Provider, { cascade: true, onDelete: 'CASCADE' })
    @JoinTable({
        name: 'patientHasProvider',
        joinColumn: {
            name: "patient_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "provider_id",
            referencedColumnName: "id"
        }
    })
    provider: Provider[];

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}

export default Patient;