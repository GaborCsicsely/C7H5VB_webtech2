import { Injectable, inject } from '@angular/core';
import { ComputerDTO } from '../../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<ComputerDTO[]>('/api/computer');    
  }

  getOne(id: number) {
    return this.http.get<ComputerDTO>('/api/computer/' + id);    
  }

  create(computer: ComputerDTO) {
    return this.http.post<ComputerDTO>('/api/computer', computer);
  }

  update(computer: ComputerDTO) {
    return this.http.put<ComputerDTO>('/api/computer', computer);
  }

  delete(id: number) {
    return this.http.delete('/api/computer/' + id); 
  }

}
