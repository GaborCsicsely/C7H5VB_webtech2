import "reflect-metadata"
import { DataSource } from "typeorm"
import { Computer } from "./entity/Computer"
import { Company } from "./entity/Company"
import { Transactions } from "./entity/Transactions"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "szamitogepnagyker",
    synchronize: true,
    logging: true,
    entities: [Computer, Company, Transactions],
    migrations: [],
    subscribers: [],
})
