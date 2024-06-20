import { Entity, PrimaryGeneratedColumn, Column, Int32 } from "typeorm"

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyName: string;

    @Column()
    representativesName: string;

    @Column()
    taxNumber: string;

    @Column()
    registrationNumber: string;

    @Column()
    address: string;

    @Column()
    balance: number;

    @Column()
    password: string;
}
