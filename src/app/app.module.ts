import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostGridComponent } from './components/post-grid/post-grid.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { PostService } from './services/post.service';

@NgModule({
  declarations: [
    AppComponent,
    PostGridComponent,
    PostCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forRoot(reducers),
  ],
  providers: [
    provideHttpClient(withFetch()),
    PostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
