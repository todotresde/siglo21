/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi2TestModule } from '../../../test.module';
import { WSConfigurationDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ws-configuration/ws-configuration-delete-dialog.component';
import { WSConfigurationService } from '../../../../../../main/webapp/app/entities/ws-configuration/ws-configuration.service';

describe('Component Tests', () => {

    describe('WSConfiguration Management Delete Component', () => {
        let comp: WSConfigurationDeleteDialogComponent;
        let fixture: ComponentFixture<WSConfigurationDeleteDialogComponent>;
        let service: WSConfigurationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [WSConfigurationDeleteDialogComponent],
                providers: [
                    WSConfigurationService
                ]
            })
            .overrideTemplate(WSConfigurationDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WSConfigurationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WSConfigurationService);
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
