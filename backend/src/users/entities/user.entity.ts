import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Store } from '../../stores/entities/store.entity';
import { Rating } from '../../ratings/entities/rating.entity';

export enum UserRole {
    SYSTEM_ADMIN = 'System Administrator',
    NORMAL_USER = 'Normal User',
    STORE_OWNER = 'Store Owner',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ length: 400 })
    address: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.NORMAL_USER })
    role: UserRole;

    @OneToMany(() => Store, (store) => store.owner)
    stores: Store[];

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[];
}
