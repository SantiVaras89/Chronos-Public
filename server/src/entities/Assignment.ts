import {
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Project } from "./Project";
import { Employee } from "./Employee";

@Entity()
export class Assignment extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public employeeId: number;

    @Column()
    public projectId: number;
 
    @Column({ nullable: true })
    public start_date: Date;

    @Column({ nullable: true })
    public end_date: Date;

    @Column({ nullable: true })
    public start_time: string;

    @Column({ nullable: true })
    public end_time: string;

    @ManyToOne(() => Project)
    @JoinColumn()
    project: Project

    @ManyToOne(() => Employee)
    @JoinColumn()
    employee: Employee
    
    }