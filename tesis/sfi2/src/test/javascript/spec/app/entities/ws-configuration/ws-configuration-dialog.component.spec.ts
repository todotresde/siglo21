/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi2TestModule } from '../../../test.module';
import { WSConfigurationDialogComponent } from '../../../../../../main/webapp/app/entities/ws-configuration/ws-configuration-dialog.component';
import { WSConfigurationService } from '../../../../../../main/webapp/app/entities/ws-configuration/ws-configuration.service';
import { WSConfiguration } from '../../../../../../main/webapp/app/entities/ws-configuration/ws-configuration.model';
import { WorkStationService } from '../../../../../../main/webapp/app/entities/work-station';
import { SupplyTypeService } from '../../../../../../main/webapp/app/entities/supply-type';
import { EmployeeService } from '../../../../../../main/webapp/app/entities/employee';
import { LineService } from '../../../../../../main/webapp/app/entities/line';

describe('Component Tests', () => {

    describe('WSConfiguration Management Dialog Component', () => {
        let comp: WSConfigurationDialogComponent;
        let fixture: ComponentFixture<WSConfigurationDialogComponent>;
        let service: WSConfigurationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [WSConfigurationDialogComponent],
                providers: [
                    WorkStationService,
                    SupplyTypeService,
                    EmployeeService,
                    LineService,
                    WSConfigurationService
                ]
            })
            .overrideTemplate(WSConfigurationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WSConfigurationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WSConfigurationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WSConfiguration(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.wSConfiguration = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'wSConfigurationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WSConfiguration();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.wSConfiguration = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'wSConfigurationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
