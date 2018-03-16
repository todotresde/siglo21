/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi2TestModule } from '../../../test.module';
import { STAttributeValueDialogComponent } from '../../../../../../main/webapp/app/entities/st-attribute-value/st-attribute-value-dialog.component';
import { STAttributeValueService } from '../../../../../../main/webapp/app/entities/st-attribute-value/st-attribute-value.service';
import { STAttributeValue } from '../../../../../../main/webapp/app/entities/st-attribute-value/st-attribute-value.model';
import { ProductService } from '../../../../../../main/webapp/app/entities/product';
import { SupplyService } from '../../../../../../main/webapp/app/entities/supply';
import { SupplyTypeService } from '../../../../../../main/webapp/app/entities/supply-type';
import { STAttributeService } from '../../../../../../main/webapp/app/entities/st-attribute';

describe('Component Tests', () => {

    describe('STAttributeValue Management Dialog Component', () => {
        let comp: STAttributeValueDialogComponent;
        let fixture: ComponentFixture<STAttributeValueDialogComponent>;
        let service: STAttributeValueService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [STAttributeValueDialogComponent],
                providers: [
                    ProductService,
                    SupplyService,
                    SupplyTypeService,
                    STAttributeService,
                    STAttributeValueService
                ]
            })
            .overrideTemplate(STAttributeValueDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(STAttributeValueDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(STAttributeValueService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new STAttributeValue(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.sTAttributeValue = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sTAttributeValueListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new STAttributeValue();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.sTAttributeValue = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sTAttributeValueListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
