/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Sfi2TestModule } from '../../../test.module';
import { MOProductDetailComponent } from '../../../../../../main/webapp/app/entities/mo-product/mo-product-detail.component';
import { MOProductService } from '../../../../../../main/webapp/app/entities/mo-product/mo-product.service';
import { MOProduct } from '../../../../../../main/webapp/app/entities/mo-product/mo-product.model';

describe('Component Tests', () => {

    describe('MOProduct Management Detail Component', () => {
        let comp: MOProductDetailComponent;
        let fixture: ComponentFixture<MOProductDetailComponent>;
        let service: MOProductService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [MOProductDetailComponent],
                providers: [
                    MOProductService
                ]
            })
            .overrideTemplate(MOProductDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MOProductDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MOProductService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MOProduct(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mOProduct).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
