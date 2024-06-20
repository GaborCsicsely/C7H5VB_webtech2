import { Routes } from '@angular/router';
import { ComputerListComponent } from './computer-list/computer-list.component';
import { ComputerFormComponent } from './computer-form/computer-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { LoginComponent } from './login/login.component';
import { UserComputerListComponent } from './user-computer-list/user-computer-list.component';
import { UserRentComputerComponent } from './user-rent-computer/user-rent-computer.component';
import { UserTransactionsComponent } from './user-transactions/user-transactions.component';
import { UserAddBalanceComponent } from './user-add-balance/user-add-balance.component';
import { TransactionsComponent } from './transactions/transactions.component';

export const routes: Routes = [
    {
        path: 'computer',
        component: ComputerListComponent
    },
    {
        path: 'add-computer',
        component: ComputerFormComponent
    },
    {
        path: 'edit-computer/:id',
        component: ComputerFormComponent
    },
    {
        path: 'company',
        component: CompanyListComponent
    },
    {
        path: 'add-company',
        component: CompanyFormComponent
    },
    {
        path: 'edit-company/:id',
        component: CompanyFormComponent
    }
    ,
    {
        path: '',
        component: LoginComponent
    }
    ,
    {
        path: 'user/computer',
        component: UserComputerListComponent
    }
    ,
    {
        path: 'user/rent-computer/:id',
        component: UserRentComputerComponent
    }
    ,
    {
        path: 'user/transactions',
        component: UserTransactionsComponent
    }
    ,
    {
        path: 'user/transactions/:id',
        component: UserTransactionsComponent
    }
    ,
    {
        path: 'user/add-balance',
        component: UserAddBalanceComponent
    }
    ,
    {
        path: 'transactions/:id',
        component: TransactionsComponent
    }
];