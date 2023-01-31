import {
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Role extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;
   
    @Column()
    public role:string

    }