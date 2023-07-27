import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { LazyLoadImageComponent } from './lazy-load-image/lazy-load-image.component';

const routes: Routes = [
  {
    path:"",redirectTo:"image",pathMatch:"full"
  },
  {
    path:"video",component:VideoUploadComponent
  },
  {
    path:"image",component:LazyLoadImageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
