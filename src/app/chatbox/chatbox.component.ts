import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserservicesService } from '../Shared/Services/userservices.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from "../Modules/layout/layout.component";

@Component({
  selector: 'app-chatbox',
  imports: [CommonModule, FormsModule, LayoutComponent],
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  chatMessages: {
time: any; sender: string, message: string 
}[] = [];
  searchName: string = '';

  constructor(private route: ActivatedRoute, private userService: UserservicesService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.searchName = params['name'];
        this.addUserMessage(this.searchName);
        this.fetchAIResponse(this.searchName);
        setTimeout(() => { 
          this.searchName = '';  // Clear the search input field after processing
        }, 0);
      }
    });
  }
  addUserMessage(userMessage: string) {
    this.chatMessages.push({
      sender: 'User', 
      message: userMessage,
      time: new Date().toLocaleTimeString() // Adds current time
    });
  }
  
  fetchAIResponse(userMessage: string) {
    this.userService.getChat(userMessage).subscribe({
      next: (data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          data.forEach(item => {
            this.chatMessages.push({
              sender: 'AI', 
              message: item.description || "No description available",
              time: new Date().toLocaleTimeString() // Adds current time
            });
          });
        } else {
          this.chatMessages.push({    
            sender: 'AI', 
            message: "No relevant information found.",
            time: new Date().toLocaleTimeString() // Adds current time
          });
        }
      },
      
    });
  }
  searchAndFetchChat() {
    if (this.searchName.trim() !== '') {
      this.addUserMessage(this.searchName);
      this.fetchAIResponse(this.searchName);
      this.searchName = ''; // Clear input field after sending message
    }
  }
}  