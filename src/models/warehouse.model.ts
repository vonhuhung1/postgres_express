import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne ,OneToMany} from "typeorm"
import { organization } from "./organization.model";
import { shelf } from "./shelf.model";

@Entity()
export class warehouse extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    infor: string;

    @ManyToOne(() => organization, (organization) => organization.warehouses)
    organization: organization
    
    @OneToMany(() => shelf, (shelf) => shelf.warehouse)
    shelfs: shelf[]
}