import { Entity, PrimaryGeneratedColumn, Column, Int32 } from "typeorm"

@Entity()
export class Computer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    computerId: string;

    @Column()
    name: string;

    @Column()
    madeBy: string;

    @Column()
    type: string;

    @Column()
    specs: string;

    @Column()
    weight: string;

    @Column()
    price: string;

    @Column()
    isAvailable: number;
}
