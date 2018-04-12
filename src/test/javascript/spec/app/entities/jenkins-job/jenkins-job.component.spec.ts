/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JenkinsJobComponent } from '../../../../../../main/webapp/app/entities/jenkins-job/jenkins-job.component';
import { JenkinsJobService } from '../../../../../../main/webapp/app/entities/jenkins-job/jenkins-job.service';
import { JenkinsJob } from '../../../../../../main/webapp/app/entities/jenkins-job/jenkins-job.model';

describe('Component Tests', () => {

    describe('JenkinsJob Management Component', () => {
        let comp: JenkinsJobComponent;
        let fixture: ComponentFixture<JenkinsJobComponent>;
        let service: JenkinsJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JenkinsJobComponent],
                providers: [
                    JenkinsJobService
                ]
            })
            .overrideTemplate(JenkinsJobComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JenkinsJobComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JenkinsJob(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jenkinsJobs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
