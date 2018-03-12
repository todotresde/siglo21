/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sfi2TestModule } from '../../../test.module';
import { PTAttributeComponent } from '../../../../../../main/webapp/app/entities/pt-attribute/pt-attribute.component';
import { PTAttributeService } from '../../../../../../main/webapp/app/entities/pt-attribute/pt-attribute.service';
import { PTAttribute } from '../../../../../../main/webapp/app/entities/pt-attribute/pt-attribute.model';

describe('Component Tests', () => {

    describe('PTAttribute Management Component', () => {
        let comp: PTAttributeComponent;
        let fixture: ComponentFixture<PTAttributeComponent>;
        let service: PTAttributeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [PTAttributeComponent],
                providers: [
                    PTAttributeService
                ]
            })
            .overrideTemplate(PTAttributeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PTAttributeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PTAttributeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PTAttribute(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pTAttributes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
