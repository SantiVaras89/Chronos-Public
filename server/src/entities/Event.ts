import {
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Event_Type } from "./Event_Type";
import { Employee } from "./Employee";
import { Project } from "./Project";

@Entity()
export class Event extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public eventTypeId: number;

    @Column()
    public employeeId: number;

    @Column()
    public projectId: number;

    @Column()
    public start_date: Date;

    @Column()
    public end_date: Date;

    @Column()
    public start_time: Date;

    @Column()
    public end_time: Date;

    @Column()
    public period: String;

    @Column("decimal", { precision: 4, scale: 2 })
    public hours: number;

    @Column("decimal", { precision: 4, scale: 2, nullable: true})
    public half_value: number;

    @Column("decimal", { precision: 4, scale: 2, nullable: true }, )
    public full_value: number;
   
    @ManyToOne(() => Event_Type)
    @JoinColumn()
    event_type: Event_Type

    @ManyToOne(() => Employee)
    @JoinColumn()
    employee: Employee

    @ManyToOne(() => Project)
    @JoinColumn()
    project: Project


    }