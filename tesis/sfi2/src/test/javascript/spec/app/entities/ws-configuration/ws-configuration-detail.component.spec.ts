/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Sfi2TestModule } from '../../../test.module';
import { WSConfigurationDetailComponent } from '../../../../../../main/webapp/app/entities/ws-configuration/ws-configuration-detail.component';
import { WSConfigurationService } from '../../../../../../main/webapp/app/entities/ws-configuration/ws-configuration.service';
import { WSConfiguration } from '../../../../../../main/webapp/app/entities/ws-configuration/ws-configuration.model';

describe('Component Tests', () => {

    describe('WSConfiguration Management Detail Component', () => {
        let comp: WSConfigurationDetailComponent;
        let fixture: ComponentFixture<WSConfigurationDetailComponent>;
        let service: WSConfigurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [Sfi2TestModule],
                declarations: [WSConfigurationDetailComponent],
                providers: [
                    WSConfigurationService
                ]
            })
            .overrideTemplate(WSConfigurationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WSConfigurationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WSConfigurationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new WSConfiguration(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.wSConfiguration).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
