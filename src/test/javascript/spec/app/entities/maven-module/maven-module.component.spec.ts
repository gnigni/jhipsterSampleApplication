/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MavenModuleComponent } from '../../../../../../main/webapp/app/entities/maven-module/maven-module.component';
import { MavenModuleService } from '../../../../../../main/webapp/app/entities/maven-module/maven-module.service';
import { MavenModule } from '../../../../../../main/webapp/app/entities/maven-module/maven-module.model';

describe('Component Tests', () => {

    describe('MavenModule Management Component', () => {
        let comp: MavenModuleComponent;
        let fixture: ComponentFixture<MavenModuleComponent>;
        let service: MavenModuleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [MavenModuleComponent],
                providers: [
                    MavenModuleService
                ]
            })
            .overrideTemplate(MavenModuleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MavenModuleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MavenModuleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MavenModule(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mavenModules[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
