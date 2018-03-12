/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi2TestModule } from '../../../test.module';
import { PTAttributeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/pt-attribute/pt-attribute-delete-dialog.component';
import { PTAttributeService } from '../../../../../../main/webapp/app/entities/pt-attribute/pt-attribute.service';

describe('Component Tests', () => {

    describe('PTAttribute Management Delete Component', () => {
        let comp: PTAttributeDeleteDialogComponent;
        let fixture: ComponentFixture<PTAttributeDeleteDialogComponent>;
        let service: PTAttributeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [PTAttributeDeleteDialogComponent],
                providers: [
                    PTAttributeService
                ]
            })
            .overrideTemplate(PTAttributeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PTAttributeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PTAttributeService);
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
