import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostCardComponent } from './post-card.component';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { Subscription } from 'rxjs';
import { Post } from '../post-grid/post-grid.component';
import { AppState } from '../../store';

const mockStore = {
    select: jasmine.createSpy('select').and.callFake(() => of({ activePostId: null })),
    dispatch: jasmine.createSpy('dispatch'),
};

const mockPost: Post = {
    id: 1,
    userId: 1,
    title: 'Test Title',
    body: 'This is a test body.',
};

describe('Post Card Component', () => {
    let component: PostCardComponent;
    let fixture: ComponentFixture<PostCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PostCardComponent],
            providers: [
                {
                    provide: Store<AppState>,
                    useValue: mockStore
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PostCardComponent);
        component = fixture.componentInstance;
        component.post = mockPost;

        fixture.detectChanges();
    });

    afterEach(() => {
        component.ngOnDestroy();
    });

    it('Should initialize the post with its title', () => {
        expect(component.post).toEqual(mockPost);
        expect(component.currentItem).toBe('title');
    });

    it('Should set isActive on state changes', () => {
        mockStore.select.and.returnValue(of({ activePostId: mockPost.id }));

        component.ngOnInit();
        expect(component.isActive).toBeTrue();

        mockStore.select.and.returnValue(of({ activePostId: 2 }));

        component.ngOnInit();
        expect(component.isActive).toBeFalse();
    });

    it('Should cycle through the post properties on click', () => {
        component.setCardValues();

        component.updateCardTitle();
        expect(component.currentItem).toBe('body');

        component.updateCardTitle();
        expect(component.currentItem).toBe('id');

        component.updateCardTitle();
        expect(component.currentItem).toBe('userId');

        component.updateCardTitle();
        expect(component.currentItem).toBe('title');
    });
  
});
