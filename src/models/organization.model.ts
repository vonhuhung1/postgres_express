import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm"
import { department } from "./department.model";
import { warehouse } from "./warehouse.model";

@Entity()
export class organization extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @OneToMany(() => department, (department) => department.organization)
    departments: department[]

    @OneToMany(() => warehouse, (warehouse) => warehouse.organization)
    warehouses: warehouse[]
}