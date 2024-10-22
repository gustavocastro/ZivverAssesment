import { ActionReducerMap } from '@ngrx/store';
import { postReducer, PostState } from './post.reducer';

export interface AppState {
  postState: PostState;
}

export const reducers: ActionReducerMap<AppState> = {
  postState: postReducer
};
