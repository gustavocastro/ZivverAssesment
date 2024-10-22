import { createReducer, on } from '@ngrx/store';
import { setActivePost } from './post.actions';
import { ActivePostId } from '../components/post-grid/post-grid.component';

export interface PostState {
  activePostId: ActivePostId;
};

export const initialState: PostState = {
  activePostId: null
};

export const postReducer = createReducer(
  initialState,
  on(
    setActivePost,
    ( state, { id } ) => ({ 
      ...state,
      activePostId: id
    })
  )
);
