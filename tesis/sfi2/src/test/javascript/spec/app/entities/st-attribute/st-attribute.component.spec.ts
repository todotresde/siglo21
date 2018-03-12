/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sfi2TestModule } from '../../../test.module';
import { STAttributeComponent } from '../../../../../../main/webapp/app/entities/st-attribute/st-attribute.component';
import { STAttributeService } from '../../../../../../main/webapp/app/entities/st-attribute/st-attribute.service';
import { STAttribute } from '../../../../../../main/webapp/app/entities/st-attribute/st-attribute.model';

describe('Component Tests', () => {

    describe('STAttribute Management Component', () => {
        let comp: STAttributeComponent;
        let fixture: ComponentFixture<STAttributeComponent>;
        let service: STAttributeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [STAttributeComponent],
                providers: [
                    STAttributeService
                ]
            })
            .overrideTemplate(STAttributeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(STAttributeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(STAttributeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new STAttribute(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sTAttributes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
