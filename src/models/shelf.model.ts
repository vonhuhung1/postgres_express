import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne,OneToMany } from "typeorm"
import { warehouse } from "./warehouse.model";
import { drawer } from "./drawer.model";

@Entity()
export class shelf extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => warehouse, (warehouse) => warehouse.shelfs)
    warehouse: warehouse

    
    @OneToMany(() => drawer, (drawer) => drawer.shelf)
    drawers: drawer[]
}