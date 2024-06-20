import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ComputerDTO } from '../../../models';
import { ComputerService } from '../services/computer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-computer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './computer-form.component.html',
  styleUrl: './computer-form.component.css'
})
export class ComputerFormComponent implements OnInit {

  formBuilder = inject(FormBuilder);

  computerService = inject(ComputerService);

  router = inject(Router);

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

  isNewComputer = true;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.isNewComputer = false;
      this.computerService.getOne(id).subscribe({
        next: (computer) => this.computerForm.setValue(computer),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
  }

  saveComputer() {
    const computer = this.computerForm.value as ComputerDTO;

    if (this.isNewComputer) {
      this.computerService.create(computer).subscribe({
        next: (computerCreated) => {
          // TODO: notification
          this.router.navigateByUrl('/computer');
        },
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
    else {
      this.computerService.update(computer).subscribe({
        next: (computerCreated) => {
          // TODO: notification
          this.router.navigateByUrl('/computer');
        },
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
    
  }
}
