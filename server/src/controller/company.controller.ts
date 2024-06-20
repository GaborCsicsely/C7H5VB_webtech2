import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Company } from "../entity/Company";

export class CompanyController extends Controller {
    repository = AppDataSource.getRepository(Company);
}