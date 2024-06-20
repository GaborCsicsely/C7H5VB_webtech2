import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CompanyDTO, TransactionsDTO } from '../../../models';
import { TransactionsService } from '../services/transactions.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-add-balance',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-add-balance.component.html',
  styleUrl: './user-add-balance.component.css'
})
export class UserAddBalanceComponent implements OnInit{

  formBuilder = inject(FormBuilder);

  transactionsService = inject(TransactionsService);

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

  myForm = this.formBuilder.group({
    topUpAmount: [0]
  });

  

ngOnInit(): void {
  throw new Error('Method not implemented.');
}

requestBalance() {
  const idCompany = localStorage.getItem('idCompany') ?? '0';
  const topUpForm = this.myForm.value
  if(idCompany != '0' && idCompany != null) {
    if(topUpForm.topUpAmount != null) {
      const transactionsForm = this.formBuilder.group<TransactionsDTO>({
        id: 0,
        companyId: idCompany,
        computerId: '',
        type: 'TopUp',
        time: new Date(),
        balanceChange: '+' + topUpForm.topUpAmount ?? 0,
        completed: '0'
      });
      const transaction = transactionsForm.value as TransactionsDTO;
      this.transactionsService.create(transaction).subscribe({
        next: (transactionCreated) => {
        },
        error: (err) => {
          console.error(err);
        }
      });
      alert('Sikeres Egyenlegfeltöltési Kérelem!');
      this.router.navigateByUrl('user/computer');
    }else{
      alert("Hibás Összeg!");
    }
  }else{
    alert("Azonosítási Hiba!");
    
  }
}

}
