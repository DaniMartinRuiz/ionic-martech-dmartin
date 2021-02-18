import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class ProductcrudService {
  constructor(
    private firestore: AngularFirestore
  ) { }
  create_Product(record) {
    return this.firestore.collection('Products').add(record);
  }
  read_Product() {
    return this.firestore.collection('Products').snapshotChanges();
  }
  update_Product(recordID, record) {
    this.firestore.doc('Products/' + recordID).update(record);
  }
  delete_Product(record_id) {
    this.firestore.doc('Products/' + record_id).delete();
  }
}