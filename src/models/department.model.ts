import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne,OneToMany } from "typeorm"
import { organization } from "./organization.model";
import { staff } from "./staff.model";

@Entity()
export class department extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @ManyToOne(() => organization, (organization) => organization.departments)
    organization: organization

    @OneToMany(() => staff, (staff) => staff.department)
    staffs: staff[]
}