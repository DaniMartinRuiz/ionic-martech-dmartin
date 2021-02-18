import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductdbService } from '../core/productdbservice.service';
import { IProduct } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
import {ProductcrudService} from '../core/productcrud.service'
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string;
  public product: IProduct;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private productcrudService: ProductcrudService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
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
            
            this.product = element;
        }
      });
      console.log(this.product);
    });
  }
  editRecord(product) {
    this.router.navigate(['edit', product.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: '¿Eliminar producto?',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.productcrudService.delete_Product(id);
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
