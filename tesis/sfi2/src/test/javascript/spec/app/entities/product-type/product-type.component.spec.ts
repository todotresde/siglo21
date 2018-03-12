/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sfi2TestModule } from '../../../test.module';
import { ProductTypeComponent } from '../../../../../../main/webapp/app/entities/product-type/product-type.component';
import { ProductTypeService } from '../../../../../../main/webapp/app/entities/product-type/product-type.service';
import { ProductType } from '../../../../../../main/webapp/app/entities/product-type/product-type.model';

describe('Component Tests', () => {

    describe('ProductType Management Component', () => {
        let comp: ProductTypeComponent;
        let fixture: ComponentFixture<ProductTypeComponent>;
        let service: ProductTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [ProductTypeComponent],
                providers: [
                    ProductTypeService
                ]
            })
            .overrideTemplate(ProductTypeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductTypeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProductType(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.productTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
