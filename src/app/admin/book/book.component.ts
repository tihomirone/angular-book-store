import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Book} from "../../model/book.model";
import {BookService} from "../../service/book.service";
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-book',
  imports: [FormsModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  errorMessage: string = "";

  @Input() book: Book = new Book();
  @Output() save = new EventEmitter<any>();
  constructor(private bookService: BookService) { }

  saveBook() {
    this.bookService.saveBook(this.book).subscribe({
      next: (data) => {
      this.save.emit(data);
      $('#bookModal').modal('hide');
    }, error: (err) => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    }});
  }

  showBookModal() {
    $('#bookModal').modal('show');
  }
}
