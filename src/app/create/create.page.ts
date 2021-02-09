import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductdbService } from '../core/productdbservice.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IProduct } from '../share/interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  product: IProduct;
  productForm: FormGroup;
  constructor(
    private router: Router,
    private productdbService: ProductdbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar producto',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveProduct();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  saveProduct() {
    this.product = this.productForm.value;
    let nextKey = this.product.name.trim();
    this.product.id = nextKey;
    this.productdbService.setItem(nextKey, this.product);
    console.warn(this.productForm.value);
  }
}
