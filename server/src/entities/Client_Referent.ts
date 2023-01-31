import {
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Client } from "./Client";

@Entity()
export class Client_Referent extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public clientId: number;
   
    @Column()
    public full_name:string;
    
    @Column()
    public role: string;

    @Column()
    public email: string;

    @ManyToOne(() => Client)
    @JoinColumn()
    client: Client

    }