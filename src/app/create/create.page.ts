import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductdbService } from '../core/productdbservice.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IProduct } from '../share/interfaces';
import { ProductcrudService } from '../core/productcrud.service'

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
    private productcrudService: ProductcrudService,
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
            this.product = this.productForm.value;
            this.productcrudService.create_Product(this.product);
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
}
