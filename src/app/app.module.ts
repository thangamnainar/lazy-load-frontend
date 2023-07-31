import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { DeferModule } from 'primeng/defer';
import { LazyLoadImageComponent } from './lazy-load-image/lazy-load-image.component';
import { DefaultImageDirective } from './defaultImage-directives';
import { CustomTwoWayBindingDirective } from './TwoWayBinding';
import { DynamicDialogFormComponent } from './dynamic-dialog-form/dynamic-dialog-form.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckNumber } from './input-type-directives.directive';
@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    VideoUploadComponent,
    LazyLoadImageComponent,
    DefaultImageDirective,
    CustomTwoWayBindingDirective,
    DynamicDialogFormComponent,
    CheckNumber,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LazyLoadImageModule,
    DeferModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }],
  bootstrap: [AppComponent]
})
export class AppModule { }
