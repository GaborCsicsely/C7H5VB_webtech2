import { Component, OnInit, inject } from '@angular/core';
import { ComputerDTO } from '../../../models';
import { ComputerService } from '../services/computer.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-computer-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './computer-list.component.html',
  styleUrl: './computer-list.component.css'
})
export class ComputerListComponent implements OnInit {
  computerService = inject(ComputerService);

  router = inject(Router);

  computers: ComputerDTO[] = [];

  ngOnInit(): void {
    this.computerService.getAll().subscribe({
      next: (computers) => this.computers = computers,
      error: (err) => console.error(err)
    });
  }

  goToComputerForm(id: number) {
    this.router.navigate([ 'edit-computer', id ]);
  }

  deleteComputer(computer: ComputerDTO) {
    this.computerService.delete(computer.id).subscribe({
      next: () => {
        const index = this.computers.indexOf(computer);
        if (index > -1) {
          this.computers.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }
}
