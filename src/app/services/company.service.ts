import { Injectable, inject } from '@angular/core';
import { CompanyDTO } from '../../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<CompanyDTO[]>('/api/company');    
  }

  getOne(id: number) {
    return this.http.get<CompanyDTO>('/api/company/' + id);    
  }

  create(company: CompanyDTO) {
    return this.http.post<CompanyDTO>('/api/company', company);
  }

  update(company: CompanyDTO) {
    return this.http.put<CompanyDTO>('/api/company', company);
  }

  delete(id: number) {
    return this.http.delete('/api/company/' + id); 
  }

}
