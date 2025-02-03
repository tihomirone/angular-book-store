import { Component } from '@angular/core';
import { PurchaseItem } from '../../model/purchase-item.model';
import { PurchaseService } from '../../service/purchase.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  purchaseItemList: Array<PurchaseItem> = [];
  
  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.purchaseService.getAllPurchaseItems().subscribe(data => {
      this.purchaseItemList = data;
    });
  }

}
