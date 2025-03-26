import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports:[FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchName: string = '';

  constructor(private router: Router) {}

  goToChatbox() {
    if (this.searchName.trim()) { 
      this.router.navigate(['/chatbox'], { queryParams: { name: this.searchName } });
    } else {
      alert("Please enter a name before searching.");
    }
  }
}
