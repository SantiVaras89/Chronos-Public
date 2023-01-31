import {
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Event_Type extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;
   
    @Column()
    public name:string

    @Column()
    public status:string

    }