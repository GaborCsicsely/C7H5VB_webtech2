import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ComputerService } from '../services/computer.service';
import { Router } from '@angular/router';
import { ComputerDTO } from '../../../models';

@Component({
  selector: 'app-user-computer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-computer-list.component.html',
  styleUrl: './user-computer-list.component.css'
})
export class UserComputerListComponent implements OnInit {

  ngOnInit(): void {
    this.computerService.getAll().subscribe({
      next: (computers) => this.computers = computers,
      error: (err) => console.error(err)
    });
  }

  computerService = inject(ComputerService);

  router = inject(Router);

  computers: ComputerDTO[] = [];

goToRentalForm(id: number) {
  this.router.navigate([ 'user/rent-computer', id ]);
}

}
