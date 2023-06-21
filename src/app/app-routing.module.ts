import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostdashboardComponent } from './shared/component/postdashboard/postdashboard.component';
import { PostformComponent } from './shared/component/postform/postform.component';

const routes: Routes = [
  {
    path: '', component: PostdashboardComponent,
  },
  {
    path: 'creatPost', component: PostformComponent
  },
  {
    path: 'updatePost/:postId', component: PostformComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
