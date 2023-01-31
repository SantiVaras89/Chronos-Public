import {
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    JoinColumn 
} from "typeorm";
import { Employee } from "./Employee";
import { Role } from "./Role";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;
       
    @Column()
    public login_name:string;

    @Column()
    public password:string;

    @Column()
    public status:string;

    @Column()
    public roleId: number;

    @Column()
    public employeeId: number;

    @OneToOne(() => Employee)
    @JoinColumn()
    employee: Employee

    @ManyToOne(() => Role)
    @JoinColumn()
    role: Role

    }