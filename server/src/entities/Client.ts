import {
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Client extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;
   
    @Column()
    public name:string

    @Column()
    public cuit:string

    }