/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { Sfi2TestModule } from '../../../test.module';
import { PTAttributeDialogComponent } from '../../../../../../main/webapp/app/entities/pt-attribute/pt-attribute-dialog.component';
import { PTAttributeService } from '../../../../../../main/webapp/app/entities/pt-attribute/pt-attribute.service';
import { PTAttribute } from '../../../../../../main/webapp/app/entities/pt-attribute/pt-attribute.model';
import { ProductTypeService } from '../../../../../../main/webapp/app/entities/product-type';

describe('Component Tests', () => {

    describe('PTAttribute Management Dialog Component', () => {
        let comp: PTAttributeDialogComponent;
        let fixture: ComponentFixture<PTAttributeDialogComponent>;
        let service: PTAttributeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [PTAttributeDialogComponent],
                providers: [
                    ProductTypeService,
                    PTAttributeService
                ]
            })
            .overrideTemplate(PTAttributeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PTAttributeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PTAttributeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PTAttribute(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.pTAttribute = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'pTAttributeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PTAttribute();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.pTAttribute = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'pTAttributeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
