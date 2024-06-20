import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Computer } from "../entity/Computer";

export class ComputerController extends Controller {
    repository = AppDataSource.getRepository(Computer);
}