import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../email.service';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let emailService: jasmine.SpyObj<EmailService>;

  beforeEach(async () => {
    const emailServiceSpy = jasmine.createSpyObj('EmailService', ['sendForm']);

    await TestBed.configureTestingModule({
      imports: [LandingPageComponent, CommonModule, FormsModule],
      providers: [{ provide: EmailService, useValue: emailServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    emailService = TestBed.inject(EmailService) as jasmine.SpyObj<EmailService>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve alternar o menu mobile', () => {
    expect(component.showMobileMenu).toBeFalse();
    component.toggleMobileMenu();
    expect(component.showMobileMenu).toBeTrue();
    component.toggleMobileMenu();
    expect(component.showMobileMenu).toBeFalse();
  });

  it('deve fechar o menu mobile', () => {
    component.showMobileMenu = true;
    component.closeMobileMenu();
    expect(component.showMobileMenu).toBeFalse();
  });

  it('deve conter serviços definidos', () => {
    expect(component.services.length).toBeGreaterThan(0);
    expect(component.services[0].title).toContain('Análise Preditiva');
  });

  it('deve conter setores definidos', () => {
    expect(component.sectors.length).toBeGreaterThan(0);
    expect(component.sectors[0].title).toContain('Geologia');
  });

  it('deve lidar com envio de formulário com sucesso', fakeAsync(() => {
    const fakeEvent = {
      preventDefault: () => {},
      target: document.createElement('form')
    } as unknown as Event;

    const resetSpy = spyOn(fakeEvent.target as HTMLFormElement, 'reset');
    emailService.sendForm.and.returnValue(Promise.resolve({ status: 200, text: 'OK' }));

    component.onSubmit(fakeEvent);
    tick();

    expect(component.successMessage).toContain('Mensagem enviada com sucesso');
    expect(component.loading).toBeFalse();
    expect(resetSpy).toHaveBeenCalled();
    expect(emailService.sendForm).toHaveBeenCalled();
  }));

  it('deve lidar com erro ao enviar formulário', fakeAsync(() => {
    const fakeEvent = {
      preventDefault: () => {},
      target: document.createElement('form')
    } as unknown as Event;

    emailService.sendForm.and.returnValue(Promise.reject('erro qualquer'));

    component.onSubmit(fakeEvent);
    tick();

    expect(component.errorMessage).toContain('Erro ao enviar a mensagem');
    expect(component.loading).toBeFalse();
    expect(emailService.sendForm).toHaveBeenCalled();
  }));
});