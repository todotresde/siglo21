/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi2TestModule } from '../../../test.module';
import { ProductTypeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/product-type/product-type-delete-dialog.component';
import { ProductTypeService } from '../../../../../../main/webapp/app/entities/product-type/product-type.service';

describe('Component Tests', () => {

    describe('ProductType Management Delete Component', () => {
        let comp: ProductTypeDeleteDialogComponent;
        let fixture: ComponentFixture<ProductTypeDeleteDialogComponent>;
        let service: ProductTypeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [ProductTypeDeleteDialogComponent],
                providers: [
                    ProductTypeService
                ]
            })
            .overrideTemplate(ProductTypeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductTypeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductTypeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
