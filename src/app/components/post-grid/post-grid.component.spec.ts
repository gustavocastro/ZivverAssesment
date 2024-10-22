import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Post, PostGridComponent } from './post-grid.component';
import { PostService } from '../../services/post.service';
import { of } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { PostCardComponent } from '../post-card/post-card.component';
import { AppState } from '../../store';

const mockStore = {
    select: jasmine.createSpy('select').and.callFake(() => of({ activePostId: null })),
    dispatch: jasmine.createSpy('dispatch'),
};

const mockPosts: Post[] = [
    {
        id: 1,
        userId: 1,
        title: 'Post 1',
        body: 'Content 1'
    },
    {
        id: 2,
        userId: 1,
        title: 'Post 2',
        body: 'Content 2'
    },
];

describe('Post Grid Component', () => {
  let component: PostGridComponent;
  let fixture: ComponentFixture<PostGridComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

    beforeEach(async () => {
        const postServiceMock = jasmine.createSpyObj('PostService', ['getPosts']);

        await TestBed.configureTestingModule({
            declarations: [
                PostGridComponent,
                PostCardComponent
            ],
            providers: [
                {
                    provide: PostService,
                    useValue: postServiceMock
                },
                {
                    provide: Store<AppState>,
                    useValue: mockStore
                },
            ],
            imports: [StoreModule.forRoot({})],
        }).compileComponents();

        fixture = TestBed.createComponent(PostGridComponent);
        component = fixture.componentInstance;
        postServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    });

    it('Should fetch posts on initialisation', () => {
        postServiceSpy.getPosts.and.returnValue(of(mockPosts));

        // Triggers ngOnInit, which is where we call the fetching of the data
        fixture.detectChanges();

        expect(component.posts).toEqual(mockPosts);
    });

    it('Should update activePostId from store', () => {
        const updatedState = { activePostId: 1 };

        mockStore.select.and.callFake(() => {
            return of(updatedState);
        });

        postServiceSpy.getPosts.and.returnValue(of(mockPosts));

        fixture.detectChanges();
  
        expect(component.activePostId).toBe(1);
    });
});
