import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { CitesListComponent } from './cites-list/cites-list.component';
import { ResultComponent } from './result/result.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StateModel } from './interfaces/state.interface';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CitesListComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
