/* tslint:disable:no-unused-variable */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    button = fixture.debugElement.nativeElement.querySelector('button');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('應該有正確的預設值', () => {

    expect(component).toEqual(
      jasmine.objectContaining({
        disabled: false,
        color: 'primary'
      })
    );

    expect(component.classMap).toEqual({
      'btn-primary': true,
      'btn-secondary': false,
      'btn-success': false,
      'btn-danger': false,
      'btn-warning': false,
      'btn-info': false,
      'btn-light': false,
      'btn-dark': false,
      'btn-link': false,
    });

    expect(button.disabled).toBeFalse();

  });

  it('當 @Input disabled 傳入 true，按鈕需禁用', () => {

    component.disabled = true;

    fixture.detectChanges();

    expect(button.disabled).toBeTruthy();

  });

  it('當 color 帶入 secondary 時，按鈕 應該套上 btn-secondary', () => {

    component.color = 'secondary';

    fixture.detectChanges();

    expect(button.classList).toContain('btn-secondary');

  });

  it('classMap 應該根據 this.color 回傳對應的 className', () => {

    component.color = 'secondary';

    expect(component.classMap).toEqual({
      'btn-primary': false,
      'btn-secondary': true,
      'btn-success': false,
      'btn-danger': false,
      'btn-warning': false,
      'btn-info': false,
      'btn-light': false,
      'btn-dark': false,
      'btn-link': false,
    });

  });

  it('測試class是否正常', fakeAsync(() => {
    expect(button.classList).not.toContain('w-100');

    component.class = 'w-100';

    tick(0);

    fixture.detectChanges();

    expect(button.classList).toContain('w-100');
  }));

  it('當按鈕點點擊時，需發送 buttonClick.emit event', () => {

    const buttonClickEmitSpy = spyOn(component.buttonClick, 'emit');

    expect(buttonClickEmitSpy).not.toHaveBeenCalled();
    expect(buttonClickEmitSpy).toHaveBeenCalledTimes(0);

    button.click();

    expect(buttonClickEmitSpy).toHaveBeenCalled();
    expect(buttonClickEmitSpy).toHaveBeenCalledTimes(1);

  });

});
