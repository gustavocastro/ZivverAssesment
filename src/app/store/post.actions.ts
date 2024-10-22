import { createAction, props } from '@ngrx/store';
import { ActivePostId } from '../components/post-grid/post-grid.component';

export const setActivePost = createAction(
  '[POST] Set post active',
  props<{ id: ActivePostId }>()
);
