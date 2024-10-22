import { setActivePost } from "./post.actions";
import { initialState, postReducer, PostState } from "./post.reducer";

describe('Post Reducer', () => {
    it ('Should return the initial state', () => {
        const state = postReducer(undefined, {type: 'Random action'});
        expect(state).toEqual(initialState);
    });

    it('Should set posts active when dispatching setActivePost', () => {
        const postId = 5;
        const action = setActivePost({ id: postId });
        const expectedState: PostState = { activePostId: postId };
    
        const state = postReducer(initialState, action);
        expect(state).toEqual(expectedState);
      });
    
      it('Should reset any active posts when setActivePost is dispatched with null', () => {
        const initial: PostState = { activePostId: 10 };
        const action = setActivePost({ id: null });
        const expectedState: PostState = { activePostId: null };
    
        const state = postReducer(initial, action);
        expect(state).toEqual(expectedState);
      });
});