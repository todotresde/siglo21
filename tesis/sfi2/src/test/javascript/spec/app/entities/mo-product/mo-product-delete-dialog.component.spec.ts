/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi2TestModule } from '../../../test.module';
import { MOProductDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/mo-product/mo-product-delete-dialog.component';
import { MOProductService } from '../../../../../../main/webapp/app/entities/mo-product/mo-product.service';

describe('Component Tests', () => {

    describe('MOProduct Management Delete Component', () => {
        let comp: MOProductDeleteDialogComponent;
        let fixture: ComponentFixture<MOProductDeleteDialogComponent>;
        let service: MOProductService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [MOProductDeleteDialogComponent],
                providers: [
                    MOProductService
                ]
            })
            .overrideTemplate(MOProductDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MOProductDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MOProductService);
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
