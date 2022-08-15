import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm"
import { department } from "./department.model";
import { profile } from "./profile.model";

@Entity()
export class staff extends BaseEntity {
    isPasswordMatch(password: string) {
        throw new Error("Method not implemented.");
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    isAdmin: boolean;

    @ManyToOne(() => department, (department) => department.staffs)
    department: department

    @OneToMany(() => profile, (profile) => profile.staff)
    profiles: profile[]
}