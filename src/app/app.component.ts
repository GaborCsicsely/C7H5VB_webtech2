import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  router = inject(Router);


  clearLocalStorage() {
  localStorage.clear();

  alert("Sikeres kijelentkezés!");
  this.router.navigateByUrl('/').then(() => {
    window.location.reload();
  });
}
  loginType: string = '';
  
  ngOnInit(): void {
    const storedLoginType = localStorage.getItem('loginType');
    if (storedLoginType !== null) {
      this.loginType = storedLoginType;
    }
  }

  title = 'Szamitogep nagyker';



}
