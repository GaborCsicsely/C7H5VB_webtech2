import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyDTO } from '../../../models';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent implements OnInit{

  formBuilder = inject(FormBuilder);

  companyService = inject(CompanyService);

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

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

  isNewCompany = true;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.isNewCompany = false;
      this.companyService.getOne(id).subscribe({
        next: (company) => this.companyForm.setValue(company),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
  }

  saveCompany() {
    const company = this.companyForm.value as CompanyDTO;

    if (this.isNewCompany) {
      this.companyService.create(company).subscribe({
        next: (companyCreated) => {
          // TODO: notification
          this.router.navigateByUrl('/company');
        },
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
    else {
      this.companyService.update(company).subscribe({
        next: (companyCreated) => {
          // TODO: notification
          this.router.navigateByUrl('/company');
        },
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
    
  }
}
