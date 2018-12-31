import { PostFormComponent } from './post-form/post-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {HomeComponent} from "./home/home.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {PostsComponent} from "./posts/posts.component";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ContactComponent} from "./contact/contact.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/edit/:userId', component: UserFormComponent},
  {path: 'users/create', component: UserFormComponent},
  {path: 'users/:userId', component: UserDetailComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'posts/edit/:postId', component: PostFormComponent},
  {path: 'posts/create', component: PostFormComponent},
  {path: 'posts/:postId', component: PostDetailComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
