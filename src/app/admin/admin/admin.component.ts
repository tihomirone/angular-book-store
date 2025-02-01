import { Component } from '@angular/core';
import { Book } from '../../model/book.model';
import { BookService } from '../../service/book.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  bookList: Array<Book> = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.bookList = data;
    })
  }
}
