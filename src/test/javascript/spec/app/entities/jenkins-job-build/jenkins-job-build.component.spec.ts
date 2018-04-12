/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JenkinsJobBuildComponent } from '../../../../../../main/webapp/app/entities/jenkins-job-build/jenkins-job-build.component';
import { JenkinsJobBuildService } from '../../../../../../main/webapp/app/entities/jenkins-job-build/jenkins-job-build.service';
import { JenkinsJobBuild } from '../../../../../../main/webapp/app/entities/jenkins-job-build/jenkins-job-build.model';

describe('Component Tests', () => {

    describe('JenkinsJobBuild Management Component', () => {
        let comp: JenkinsJobBuildComponent;
        let fixture: ComponentFixture<JenkinsJobBuildComponent>;
        let service: JenkinsJobBuildService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JenkinsJobBuildComponent],
                providers: [
                    JenkinsJobBuildService
                ]
            })
            .overrideTemplate(JenkinsJobBuildComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JenkinsJobBuildComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsJobBuildService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JenkinsJobBuild(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jenkinsJobBuilds[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
