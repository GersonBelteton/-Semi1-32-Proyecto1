import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FileComponent } from './file/file.component';
import { SharedModule } from '../shared/shared.module';
import { FriendComponent } from './friend/friend.component';
import { FindfriendComponent } from './findfriend/findfriend.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilefriendComponent } from './filefriend/filefriend.component';


@NgModule({
  declarations: [
    HomeComponent,
    FileComponent,
    FriendComponent,
    FindfriendComponent,
    FilefriendComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,    
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class HomeModule { }
