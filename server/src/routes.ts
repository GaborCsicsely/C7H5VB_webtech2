import express from 'express';
import { ComputerController } from './controller/computer.controller';
import { CompanyController } from './controller/company.controller';
import { TransactionsController } from './controller/transactions.controller';

export function getRouter() {
    const router = express.Router();

    const computerController = new ComputerController();

    router.get('/computer', computerController.getAll);
    router.get('/computer/:id', computerController.getOne);
    router.post('/computer', computerController.create);
    router.put('/computer', computerController.update);
    router.delete('/computer/:id', computerController.delete);


    const companyController = new CompanyController();

    router.get('/company', companyController.getAll);
    router.get('/company/:id', companyController.getOne);
    router.post('/company', companyController.create);
    router.put('/company', companyController.update);
    router.delete('/company/:id', companyController.delete);

    const transactionsController = new TransactionsController();

    router.get('/transactions', transactionsController.getAll);
    router.get('/transactions/:id', transactionsController.getOne);
    router.post('/transactions', transactionsController.create);
    router.put('/transactions', transactionsController.update);
    router.delete('/transactions/:id', transactionsController.delete);


    return router;
}