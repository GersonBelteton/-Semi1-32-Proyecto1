import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileComponent } from './file/file.component';
import { FindfriendComponent } from './findfriend/findfriend.component';
import { FriendComponent } from './friend/friend.component';

const routes: Routes = [
  {
    path: 'file',
    component: FileComponent
  },
  { path: '', redirectTo: 'file', pathMatch: 'full' },
  {
    path: 'friend',
    component: FriendComponent
  },
  {
    path: 'findfriend',
    component: FindfriendComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
