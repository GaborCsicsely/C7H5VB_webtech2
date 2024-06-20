import { Component, OnInit, inject } from '@angular/core';
import { CompanyDTO } from '../../../models';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent implements OnInit{

  companyService = inject(CompanyService);

  router = inject(Router);

  companies: CompanyDTO[] = [];

  ngOnInit(): void {
    this.companyService.getAll().subscribe({
      next: (companies) => this.companies = companies,
      error: (err) => console.error(err)
    });
  }

  goToCompanyForm(id: number) {
    this.router.navigate([ 'edit-company', id ]);
  }

  goToTransactions(id: number) {
    this.router.navigate([ 'transactions', id ]);
  }

  deleteCompany(company: CompanyDTO) {
    this.companyService.delete(company.id).subscribe({
      next: () => {
        const index = this.companies.indexOf(company);
        if (index > -1) {
          this.companies.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }
}
