import {
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    ManyToOne,
    JoinColumn,
} from "typeorm";

@Entity()
export class Calendar_Event extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number;
   
    @Column()
    public title: string;

    @Column()
    public start: string;

    @Column({nullable: true})
    public end: string;

    @Column({default: false})
    public holiday: boolean;



}