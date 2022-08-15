import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne ,OneToMany} from "typeorm"
import { shelf } from "./shelf.model";
import { profile } from "./profile.model";

@Entity()
export class drawer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => shelf, (shelf) => shelf.drawers)
    shelf: shelf
    
    @OneToMany(() => profile, (profile) => profile.drawer)
    profiles: profile[]
}