import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductdbService } from '../core/productdbservice.service';
import { IProduct } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  product: IProduct;
  productForm: FormGroup;

  constructor(private router: Router,
    private activatedrouter: ActivatedRoute,
    private productdbService: ProductdbService,
    public toastController: ToastController) { }

  ngOnInit() {
       this.id = this.activatedrouter.snapshot.params.id;
    this.productdbService.getItem(this.id).then(
      (data: IProduct) => {
        this.product = data
        this.productForm.get('name').setValue(this.product.name);
        this.productForm.get('description').setValue(this.product.description);
        this.productForm.get('image').setValue(this.product.image);
        this.productForm.get('price').setValue(this.product.price);
      }
    );

    this.productForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl('')
    });
  }
  async onSubmit(){
    const toast = await this.toastController.create({
      header: 'Actualizar producto',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.editarProducto();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Has clickado cancelar');
          }
        }
      ]
    });
    toast.present();
  }
  editarProducto() {
    this.product = this.productForm.value;
    let id = this.id;
    this.productdbService.remove(this.id);
    this.product.id = id;
    this.productdbService.setItem(this.product.id, this.product);
  }
}
