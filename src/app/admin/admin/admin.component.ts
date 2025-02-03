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
  selectedBook: Book = new Book;

  @ViewChild(BookComponent) child: BookComponent | undefined;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.bookList = data;
    })
  }

  createBookRequest() {
    this.selectedBook = new Book;
    this.child?.showBookModal();
  }

  editBookRequest(item: Book) {
    this.selectedBook = Object.assign({}, item);
    this.child?.showBookModal();
  }

  saveBookWatcher(book: Book) {
    let itemIndex = this.bookList.findIndex(item => item.id === book.id);
    if (itemIndex !== -1) {
      this.bookList[itemIndex] = book;
    } else {
      this.bookList.push(book);
    }
  }
}
