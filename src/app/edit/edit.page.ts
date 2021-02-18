import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductdbService } from '../core/productdbservice.service';
import { IProduct } from '../share/interfaces';
import { ProductcrudService } from '../core/productcrud.service';

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
    private productcrudService: ProductcrudService,
    public toastController: ToastController) { }

  ngOnInit() {

    this.productForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl('')
    });

    this.id = this.activatedrouter.snapshot.params.id;
    this.productcrudService.read_Product().subscribe(data => {
      let products = data.map(e => {       
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          image: e.payload.doc.data()['image'],
          price: e.payload.doc.data()['price'],
        };
      })
 
      products.forEach(element => {
        if(element.id == this.id){
          this.product=element;
          this.productForm.get('name').setValue(this.product.name),
          this.productForm.get('description').setValue(this.product.description),
          this.productForm.get('image').setValue(this.product.image),
          this.productForm.get('price').setValue(this.product.price)
        }
      });

      console.log(this.product);
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
            this.product=this.productForm.value;
            this.productcrudService.update_Product(this.id,this.product);
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
}
