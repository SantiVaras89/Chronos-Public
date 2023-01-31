import {
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Company } from "./Company";

@Entity()
export class Employee extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;
   
    @Column()
    public first_name:string

    @Column()
    public last_name:string

    @Column()
    public email:string

    @Column({ nullable: true })
    public companyId:number

    @Column({ nullable: true })
    public dni:string

    @ManyToOne(() => Company)
    @JoinColumn()
    company: Company

    }