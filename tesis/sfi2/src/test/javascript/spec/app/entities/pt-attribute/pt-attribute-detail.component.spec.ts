/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Sfi2TestModule } from '../../../test.module';
import { PTAttributeDetailComponent } from '../../../../../../main/webapp/app/entities/pt-attribute/pt-attribute-detail.component';
import { PTAttributeService } from '../../../../../../main/webapp/app/entities/pt-attribute/pt-attribute.service';
import { PTAttribute } from '../../../../../../main/webapp/app/entities/pt-attribute/pt-attribute.model';

describe('Component Tests', () => {

    describe('PTAttribute Management Detail Component', () => {
        let comp: PTAttributeDetailComponent;
        let fixture: ComponentFixture<PTAttributeDetailComponent>;
        let service: PTAttributeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [PTAttributeDetailComponent],
                providers: [
                    PTAttributeService
                ]
            })
            .overrideTemplate(PTAttributeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PTAttributeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PTAttributeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PTAttribute(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.pTAttribute).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
