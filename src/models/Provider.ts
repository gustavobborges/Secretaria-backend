import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable, OneToOne, OneToMany } from 'typeorm';
import User from './User';

@Entity('providers')
class Provider {
   
    @PrimaryGeneratedColumn('uuid')
    id: String;
    
    @Column()
    user_id: String;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User | null;
    
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}

export default Provider;