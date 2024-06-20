import { Entity, PrimaryGeneratedColumn, Column, Int32 } from "typeorm"

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyId: string;

    @Column()
    computerId: string;

    @Column()
    type: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    time: Date;

    @Column()
    balanceChange: string;

    @Column()
    completed: string;
}
