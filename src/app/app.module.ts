import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ButtonComponent } from './button/button.component';
import { TextInputComponent } from './text-input/text-input.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInfoAreaComponent } from './user-info-area/user-info-area.component';

@NgModule({
  declarations: [	
    AppComponent,
      ButtonComponent,
      TextInputComponent,
      UserInfoComponent,
      UserInfoAreaComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
