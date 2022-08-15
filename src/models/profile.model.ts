import { CreateDateColumn, UpdateDateColumn ,Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, Timestamp } from "typeorm"
import { staff } from "./staff.model";
import { drawer } from "./drawer.model";


@Entity()
export class profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    infor: string;

    @Column()
    status: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(() => drawer, (drawer) => drawer.profiles)
    drawer: drawer

    @ManyToOne(() => staff, (staff) => staff.profiles)
    staff: staff
}