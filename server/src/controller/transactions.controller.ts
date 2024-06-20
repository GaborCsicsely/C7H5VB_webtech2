import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Transactions } from "../entity/Transactions";

export class TransactionsController extends Controller {
    repository = AppDataSource.getRepository(Transactions);
}