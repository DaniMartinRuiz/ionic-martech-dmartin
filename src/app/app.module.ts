import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


import {AngularFireModule} from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { CreatePageModule } from './create/create.module';
import { HomePageModule } from './home/home.module';
import { EditPageModule } from './edit/edit.module';
import { DetailsPageModule } from './details/details.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule, CreatePageModule,HomePageModule,EditPageModule,DetailsPageModule, 
    AngularFireModule.initializeApp(environment.firebase),AngularFirestoreModule,AngularFireDatabaseModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
