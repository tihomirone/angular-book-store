import { Component, ViewChild } from '@angular/core';
import { Book } from '../../model/book.model';
import { BookService } from '../../service/book.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BookComponent } from "../book/book.component";

@Component({
  selector: 'app-admin',
  imports: [CurrencyPipe, DatePipe, BookComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  bookList: Array<Book> = [];

  @ViewChild(BookComponent) child: BookComponent | undefined;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.bookList = data;
    })
  }

  createBookRequest() {
    this.child?.showBookModal();
  }
}
