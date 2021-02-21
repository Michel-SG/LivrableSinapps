import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ViewCordinateComponent } from './view-cordinate/view-cordinate.component';
import { ViewFormComponent } from './view-form/view-form.component';
import { ViewCordinateService } from './services/view-cordinate.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ViewCordinateComponent,
    ViewFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCKRDvISi52UfkEouYxPwsmvhDdxafdDRI'
    }),
  ],
  providers: [ViewCordinateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
