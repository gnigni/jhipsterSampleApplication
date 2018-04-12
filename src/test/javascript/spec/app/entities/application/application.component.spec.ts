/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ApplicationComponent } from '../../../../../../main/webapp/app/entities/application/application.component';
import { ApplicationService } from '../../../../../../main/webapp/app/entities/application/application.service';
import { Application } from '../../../../../../main/webapp/app/entities/application/application.model';

describe('Component Tests', () => {

    describe('Application Management Component', () => {
        let comp: ApplicationComponent;
        let fixture: ComponentFixture<ApplicationComponent>;
        let service: ApplicationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ApplicationComponent],
                providers: [
                    ApplicationService
                ]
            })
            .overrideTemplate(ApplicationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Application(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.applications[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
