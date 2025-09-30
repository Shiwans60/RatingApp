import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Rating } from '../../ratings/entities/rating.entity';

@Entity('stores')
export class Store {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ length: 400 })
    address: string;

    @Column({ name: 'owner_id' })
    ownerId: string;

    @ManyToOne(() => User, (user) => user.stores)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @OneToMany(() => Rating, (rating) => rating.store)
    ratings: Rating[];
}
