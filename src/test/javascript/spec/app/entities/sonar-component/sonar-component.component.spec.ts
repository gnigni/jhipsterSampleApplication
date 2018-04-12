/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { SonarComponentComponent } from '../../../../../../main/webapp/app/entities/sonar-component/sonar-component.component';
import { SonarComponentService } from '../../../../../../main/webapp/app/entities/sonar-component/sonar-component.service';
import { SonarComponent } from '../../../../../../main/webapp/app/entities/sonar-component/sonar-component.model';

describe('Component Tests', () => {

    describe('SonarComponent Management Component', () => {
        let comp: SonarComponentComponent;
        let fixture: ComponentFixture<SonarComponentComponent>;
        let service: SonarComponentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [SonarComponentComponent],
                providers: [
                    SonarComponentService
                ]
            })
            .overrideTemplate(SonarComponentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SonarComponentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SonarComponentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SonarComponent(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sonarComponents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
