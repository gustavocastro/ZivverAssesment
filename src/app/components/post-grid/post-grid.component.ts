import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

export type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
};

export type ActivePostId = number | null;

@Component({
  selector: 'post-grid',
  templateUrl: './post-grid.component.html',
  styleUrl: './post-grid.component.scss'
})
export class PostGridComponent
  implements OnInit, OnDestroy {

  public posts: Post[] = [];
  public activePostId: ActivePostId = null;

  private postStateSubscription: Subscription;

  constructor(
    private postService: PostService,
    private store: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.postStateSubscription = this.store
      .select('postState')
      .subscribe((state) => {
        this.activePostId = state.activePostId;
      });

    this.fetchPosts();
  }

  public ngOnDestroy(): void {
    this.postStateSubscription.unsubscribe();
  }

  private fetchPosts(): void {
    this.postService
    .getPosts()
    .subscribe((posts) => {
      this.posts = posts;
    });
  }

}
