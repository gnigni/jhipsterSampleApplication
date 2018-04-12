/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { GitRepoComponent } from '../../../../../../main/webapp/app/entities/git-repo/git-repo.component';
import { GitRepoService } from '../../../../../../main/webapp/app/entities/git-repo/git-repo.service';
import { GitRepo } from '../../../../../../main/webapp/app/entities/git-repo/git-repo.model';

describe('Component Tests', () => {

    describe('GitRepo Management Component', () => {
        let comp: GitRepoComponent;
        let fixture: ComponentFixture<GitRepoComponent>;
        let service: GitRepoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [GitRepoComponent],
                providers: [
                    GitRepoService
                ]
            })
            .overrideTemplate(GitRepoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GitRepoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GitRepoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new GitRepo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.gitRepos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
