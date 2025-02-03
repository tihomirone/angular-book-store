import { Component } from '@angular/core';
import { Book } from '../../model/book.model';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../service/authentication.service';
import { BookService } from '../../service/book.service';
import { PurchaseService } from '../../service/purchase.service';
import { PurchaseHistory } from '../../model/purchase.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ CurrencyPipe, FontAwesomeModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  bookList: Array<Book> = [];
  faBook = faBook;
  errorMessage: string = "";
  infoMessage: string = "";

  constructor(private authenticationService: AuthenticationService, private bookService: BookService, private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => this.bookList = data);
  }

  purchase(item: Book) {
    if (!this.authenticationService.currentUserValue?.id) {
      this.errorMessage = "You have to login first in order to purchase a book.";
      return;
    }
    const purchase = new PurchaseHistory(this.authenticationService.currentUserValue.id, item.id, item.price);
    this.purchaseService.savePurchase(purchase).subscribe({
      next: (data) => {
        this.infoMessage = "Book ordered successfully.";
      }, error: (err) => {
        this.errorMessage = "Unexpected error occurred!";
        console.log(err);
      }
    });
  }
}
