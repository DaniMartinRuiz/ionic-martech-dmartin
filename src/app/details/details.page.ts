import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductdbService } from '../core/productdbservice.service';
import { IProduct } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
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
    private productdbService: ProductdbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.productdbService.getItem(this.id).then(
      (data: IProduct) => this.product = data
    );
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
            this.productdbService.remove(id);
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
