import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './guest/login/login.component';
import { HomeComponent } from './guest/home/home.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, LoginComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-book-seller';
}
