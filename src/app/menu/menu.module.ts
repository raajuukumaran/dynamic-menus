import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ]
})
export class MenuModule { }
