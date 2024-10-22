import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { environment } from '../../enviroment';
import { provideHttpClient } from '@angular/common/http';

describe('Post Service', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                PostService,
                provideHttpClient(),
                provideHttpClientTesting()
            ],
        });
        service = TestBed.inject(PostService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('Should call the API for fetching posts', () => {
        const mockPosts = [
            {
                userId: 1,
                id: 1,
                title: 'Post 1',
                body: 'Content 1'
            },
            {
                userId: 1,
                id: 2,
                title: 'Post 2',
                body: 'Content 2'
            },
        ];

        // Ensure we get the expected data from the API
        service.getPosts().subscribe((posts) => {
            expect(posts.length).toBe(2);
            expect(posts).toEqual(mockPosts);
        });

        // Check if we're calling the right API
        const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
        expect(req.request.method).toBe('GET');
    });
});
