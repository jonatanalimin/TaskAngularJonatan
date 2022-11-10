import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, PhonePipe } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddPageComponent } from './add-page/add-page.component';
import { ProfileComponent } from './profile/profile.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { HttpInterceptorsCustom } from './helpers/HttpInterceptorsCustom';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddPageComponent,
    ProfileComponent,
    EditPageComponent,
    PhonePipe,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: HttpInterceptorsCustom,
  //   multi: true
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }
