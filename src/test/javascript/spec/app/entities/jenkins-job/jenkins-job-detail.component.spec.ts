/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { JenkinsJobDetailComponent } from '../../../../../../main/webapp/app/entities/jenkins-job/jenkins-job-detail.component';
import { JenkinsJobService } from '../../../../../../main/webapp/app/entities/jenkins-job/jenkins-job.service';
import { JenkinsJob } from '../../../../../../main/webapp/app/entities/jenkins-job/jenkins-job.model';

describe('Component Tests', () => {

    describe('JenkinsJob Management Detail Component', () => {
        let comp: JenkinsJobDetailComponent;
        let fixture: ComponentFixture<JenkinsJobDetailComponent>;
        let service: JenkinsJobService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [JenkinsJobDetailComponent],
                providers: [
                    JenkinsJobService
                ]
            })
            .overrideTemplate(JenkinsJobDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JenkinsJobDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JenkinsJobService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JenkinsJob(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jenkinsJob).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
