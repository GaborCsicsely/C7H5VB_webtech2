import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TransactionsDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<TransactionsDTO[]>('/api/transactions');    
  }

  getOne(id: number) {
    return this.http.get<TransactionsDTO>('/api/transactions/' + id);    
  }

  create(transaction: TransactionsDTO) {
    return this.http.post<TransactionsDTO>('/api/transactions', transaction);
  }

  update(transaction: TransactionsDTO) {
    return this.http.put<TransactionsDTO>('/api/transactions', transaction);
  }

  delete(id: number) {
    return this.http.delete('/api/transactions/' + id); 
  }

}
