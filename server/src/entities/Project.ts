import {
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Client } from "./Client";
import { Company } from "./Company";

@Entity()
export class Project extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    public companyId: number;

    @Column({ nullable: true })
    public clientId: number;
   
    @Column()
    public name:string;
    
    @Column()
    public start_date: Date;

    @Column()
    public end_date: Date;

    @ManyToOne(() => Client)
    @JoinColumn()
    client: Client

    @ManyToOne(() => Company)
    @JoinColumn()
    company: Company

    }