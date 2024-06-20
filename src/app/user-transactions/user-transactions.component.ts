import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsDTO } from '../../../models';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-user-transactions',
  standalone: true,
  imports: [],
  templateUrl: './user-transactions.component.html',
  styleUrl: './user-transactions.component.css'
})
export class UserTransactionsComponent implements OnInit{

  transactionsService = inject(TransactionsService);

  router = inject(Router);

  transactions: TransactionsDTO[] = [];

  ngOnInit(): void {
    const id = localStorage.getItem('idCompany') || '0';
    this.transactionsService.getAll().subscribe(transactions => {
      this.transactions = transactions.filter(transaction => transaction.companyId === id);
    });
  }
}

