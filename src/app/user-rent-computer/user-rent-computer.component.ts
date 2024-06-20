import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComputerService } from '../services/computer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDTO, ComputerDTO, TransactionsDTO } from '../../../models';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../services/company.service';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-user-rent-computer',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './user-rent-computer.component.html',
  styleUrl: './user-rent-computer.component.css'
})
export class UserRentComputerComponent implements OnInit{


  formBuilder = inject(FormBuilder);

  computerService = inject(ComputerService);

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);
  
  companyService = inject(CompanyService);

  transactionsService = inject(TransactionsService);

  computerForm = this.formBuilder.group<ComputerDTO>({
    id: 0,
    computerId: '',
    name: '',
    madeBy: '',
    type: '',
    specs: '',
    weight: '',
    price: '',
    isAvailable: 0
  });
  companyForm = this.formBuilder.group<CompanyDTO>({
    id: 0,
    companyName: '',
    representativesName: '',
    taxNumber: '',
    registrationNumber: '',
    address: '',
    balance: 0,
    password: ''
  });

  myForm = this.formBuilder.group({
    forDaysReactive: [0]
  });


  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.computerService.getOne(id).subscribe({
        next: (computer) => this.computerForm.setValue(computer),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }


    const idCompany = parseInt(localStorage.getItem('idCompany') ?? '0');

    if (idCompany !== 0) {
      this.companyService.getOne(idCompany).subscribe({
        next: (company) => this.companyForm.setValue(company),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }

  }

buyComputer() {
  const price = parseInt(this.computerForm.get('price')?.value || '0');
  const balance = this.companyForm.get('balance')?.value || 0;
  const forDays = this.myForm.get('forDaysReactive')?.value || 0;
  if(price * forDays < balance)
  {
    const newBalance = balance - (price * forDays);
    this.companyForm.patchValue({
      balance: newBalance
    });
    const computer = this.computerForm.value as ComputerDTO;
    const company = this.companyForm.value as CompanyDTO;
    this.computerService.update(computer).subscribe({
      next: (computerCreated) => {
      },
      error: (err) => {
        console.error(err);
      }
    });;
    this.companyService.update(company).subscribe({
      next: (companyCreated) => {
        // TODO: notification
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });;
    const transactionsForm = this.formBuilder.group<TransactionsDTO>({
      id: 0,
      companyId: company.id.toString(),
      computerId: computer.id.toString(),
      type: 'Purchase',
      time: new Date(),
      balanceChange: '-' + (price * forDays),
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
    alert('Sikeres Vásárlás!');
    this.router.navigateByUrl('user/computer');

  }else{
    alert('Nincs elég egyenleged!');
  }
  }

}
