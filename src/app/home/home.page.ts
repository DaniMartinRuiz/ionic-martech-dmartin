import { Component, OnInit } from '@angular/core';
import { IProduct } from '../share/interfaces';
import { ProductcrudService } from '../core/productcrud.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  
  products: any;
  productId: string;
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;

  constructor(private productcrudService: ProductcrudService, private route:
    Router) { }
  ngOnInit(): void {
    this.productcrudService.read_Product().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          image: e.payload.doc.data()['image'],
          price: e.payload.doc.data()['price'],
        };
      })
      console.log(this.products);
    });
  }
  productTapped(product) {
    this.route.navigate(['/details', product.id]);
  }
}
