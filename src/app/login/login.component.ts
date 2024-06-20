import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { CompanyDTO } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  id: string = '';
  password: string = '';

  formBuilder = inject(FormBuilder);
  
  router = inject(Router);

  companyService = inject(CompanyService);
  
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

  login() {
    if (this.id === 'admin' && this.password === 'admin') {
      alert('Sikeres Admin bejelentkezés!');
      localStorage.setItem('loginType', 'Admin');
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigateByUrl('/company').then(() => {
        window.location.reload();
      });
    } else {
      let idNumber: number = parseInt(this.id);
      this.companyService.getOne(idNumber).subscribe({
        next: (company) => {
          this.companyForm.setValue(company);
          if (this.companyForm.value.password === this.password) {
            alert('Sikeres bejelentkezés!');
            localStorage.setItem('loginType', 'User');
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('idCompany', this.id);
            this.router.navigateByUrl('user/computer').then(() => {
              window.location.reload();
            });
          } else {
            alert('Helytelen jelszó!');
          }
        },
        error: (err) => {
          console.error(err);
          alert('Helytelen ID vagy jelszó!');
        }
      });
    }
  }
}
