import { group } from "console";
import {
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    ManyToMany,JoinTable,
} from "typeorm";

@Entity()
export class Company extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;
   
    @Column()
    public name:string

    @Column()
    public alias:string

    }