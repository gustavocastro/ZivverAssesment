import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import { setActivePost } from '../../store/post.actions';
import { Post } from '../post-grid/post-grid.component';
import { Subscription } from 'rxjs';

interface Bindings {
  post: Post
}

type PostCardDisplayItem = keyof Post;

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent
  implements Bindings, OnInit, OnDestroy {

  @Input() public post: Bindings['post'];

  public isActive: boolean = false;

  public currentItem: PostCardDisplayItem = 'title';
  public displayItems: PostCardDisplayItem[] = [];

  private postStateSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  public ngOnInit(): void {
    this.postStateSubscription = this.store
      .select('postState')
      .subscribe((state) => {
        this.isActive = state.activePostId === this.post.id;

        if (!this.isActive) {
          this.currentItem = 'title';
        }
      });

    this.setCardValues();
  }

  public ngOnDestroy(): void {
    this.postStateSubscription.unsubscribe();
  }

  public closeActivePost (event: MouseEvent): void {
    event.stopPropagation();

    this.store.dispatch(setActivePost({ id: null }));
  }

  public updateCardTitle(): void {
    this.currentItem = this.getNextItem();

    this.store.dispatch(setActivePost({ id: this.post.id }));
  }

  public setCardValues(): void {
    for (const key in this.post) {
      this.displayItems.push(key as PostCardDisplayItem);
    }
  }

  private getNextItem(): PostCardDisplayItem {
    const nextItemIndex = (this.displayItems.indexOf(this.currentItem) + 1) % this.displayItems.length;

    return this.displayItems[nextItemIndex];
  }

}
