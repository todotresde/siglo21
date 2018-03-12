/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Sfi2TestModule } from '../../../test.module';
import { MOProductComponent } from '../../../../../../main/webapp/app/entities/mo-product/mo-product.component';
import { MOProductService } from '../../../../../../main/webapp/app/entities/mo-product/mo-product.service';
import { MOProduct } from '../../../../../../main/webapp/app/entities/mo-product/mo-product.model';

describe('Component Tests', () => {

    describe('MOProduct Management Component', () => {
        let comp: MOProductComponent;
        let fixture: ComponentFixture<MOProductComponent>;
        let service: MOProductService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [MOProductComponent],
                providers: [
                    MOProductService
                ]
            })
            .overrideTemplate(MOProductComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MOProductComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MOProductService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MOProduct(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mOProducts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
