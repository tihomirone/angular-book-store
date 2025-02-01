import { Component } from '@angular/core';
import { Book } from '../../model/book.model';
import { BookService } from '../../service/book.service';

declare var $: any;

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  book: Book = new Book();
  errorMessage: string = "";

  constructor(private bookService: BookService) {}

  saveBook() {
    this.bookService.saveBook(this.book).subscribe({
      next: (data) => {
      }, error: (err) => {
        this.errorMessage = 'Unexpected error occured!';
        console.log(err);
      }});
  }

  showBookModal() {
    $('#bookModal').modal('show');
  }
}
