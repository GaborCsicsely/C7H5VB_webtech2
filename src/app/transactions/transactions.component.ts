import { Component, OnInit, inject } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDTO, ComputerDTO, TransactionsDTO } from '../../../models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComputerService } from '../services/computer.service';
import { CompanyService } from '../services/company.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  

  transactionsService = inject(TransactionsService);

  router = inject(Router);

  transactions: TransactionsDTO[] = [];

  formBuilder = inject(FormBuilder);

  companyService = inject(CompanyService);

  computerService = inject(ComputerService);

  activatedRoute = inject(ActivatedRoute);
  
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
  transactionsForm = this.formBuilder.group<TransactionsDTO>({
    id: 0,
    companyId: '',
    computerId: '',
    type: '',
    time: new Date(),
    balanceChange: '',
    completed: '1'
  });

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.transactionsService.getAll().subscribe(transactions => {
        this.transactions = transactions.filter(transaction => transaction.companyId === id);
      });
    }
  }

  rejectTransaction(id: any) {
    this.transactionsService.getOne(id).subscribe({
      next: (transaction) => {
        this.transactionsForm.setValue(transaction);
        this.transactionsForm.patchValue({
          completed: '1'
        });
        const updatedTransaction = this.transactionsForm.value as TransactionsDTO;
        this.transactionsService.update(updatedTransaction).subscribe({
          next: (transactionCreated) => {
            alert('Tranzakció Elutasítva!');
            window.location.reload();
          },
          error: (err) => {
            console.error(err);
            alert('Hiba a Tranzakció Elutasítása Során!');
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  

  acceptTransaction(id: any) {
    this.transactionsService.getOne(id).subscribe({
      next: (transaction) => {

        if(transaction.type === 'Purchase') {
          this.computerService.getOne(parseInt(transaction.computerId)).subscribe(
            computer => {
            this.computerForm.setValue(computer);
            const updatedComputer = this.computerForm.value as ComputerDTO;
            this.computerService.update(updatedComputer).subscribe({
              next: (computerCreated) => {
              },
              error: (err) => {
                console.error(err);
              }
            });
          })
          this.companyService.getOne(parseInt(transaction.companyId)).subscribe(
            company => {
              this.companyForm.setValue(company);
              const updatedCompany = this.companyForm.value as CompanyDTO;
              this.companyService.update(updatedCompany).subscribe({
                next: (companyCreated) => {
                },
                error: (err) => {
                  console.error(err);
                }
              });
            }
          )
        }else if(transaction.type === 'TopUp') { 
          const balanceChangeString = transaction.balanceChange;
          let balanceChangeWithoutPlus = balanceChangeString.substring(1);
          let balanceChangeInt = parseInt(balanceChangeWithoutPlus);

          this.companyService.getOne(parseInt(transaction.companyId)).subscribe(
            company => {
              this.companyForm.setValue(company);
              this.companyForm.patchValue({
                balance: (this.companyForm.get('balance')?.value ?? 0) + balanceChangeInt
              });
              const updatedCompany = this.companyForm.value as CompanyDTO;
              this.companyService.update(updatedCompany).subscribe({
                next: (companyCreated) => {
                },
                error: (err) => {
                  console.error(err);
                }
              });
            }
          )

        }
        this.transactionsForm.setValue(transaction);
        this.transactionsForm.patchValue({
          completed: '1'
        });
        const updatedTransaction = this.transactionsForm.value as TransactionsDTO;
        this.transactionsService.update(updatedTransaction).subscribe({
          next: (transactionCreated) => {
            alert('Tranzakció Efogadva!');
            window.location.reload();
          },
          error: (err) => {
            console.error(err);
            alert('Hiba a Tranzakció Elfogadása Során!');
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
