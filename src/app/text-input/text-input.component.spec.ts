/* tslint:disable:no-unused-variable */
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TextInputComponent } from './text-input.component';

const myFormControl = new FormControl(10000);

@Component({
  template: ` <app-text-input [formControl]="formControl"></app-text-input> `,
})
class TestHostComponent {
  @ViewChild(TextInputComponent, { static: false })
  public textInputComponent: TextInputComponent;
  formControl = myFormControl;
}

describe('TextInputComponent', () => {
  let testHostComponent: TestHostComponent;
  let textInputComponent: TextInputComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputComponent, TestHostComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(TestHostComponent);

    testHostComponent = fixture.componentInstance;

    input = fixture.debugElement.nativeElement.querySelector('input');

    // 另一種獲取 child component 的方式
    textInputComponent = fixture.debugElement.query(By.directive(TextInputComponent)).componentInstance;

    fixture.detectChanges();

  });

  afterEach(() => {
    myFormControl.reset(10000, { emitEvent: false });
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('應該有正確的預設值', () => {

    expect(testHostComponent.textInputComponent).toEqual(
      jasmine.objectContaining({
        disabled: false
      })
    );

    expect(myFormControl.untouched).toBeTruthy();
    expect(myFormControl.pristine).toBeTruthy();

  });

  it('兩種獲取子元件的方式，應該獲取到同一個元件', () => {
    expect(testHostComponent.textInputComponent).toBe(textInputComponent);
  });

  it('當 @Input disabled 傳入 true， input 需禁用', () => {

    testHostComponent.textInputComponent.disabled = true;

    fixture.detectChanges();

    expect(input.disabled).toBeTruthy();

  });

  it('text-input 應該顯示 10,000', () => {
    expect(myFormControl.value).toBe(10000);
    expect(input.value).toBe('10,000');
  });

  it('當 focus 時，text-input 應該顯示 10000', () => {

    expect(input.value).toBe('10,000');

    input.dispatchEvent(new Event('focus'));

    expect(input.value).toBe('10000');

  });

  it('輸入完 123456789，blur 後應該顯示為 123,456,789 ， 且 formControl 值為 123456789', () => {

    input.dispatchEvent(new Event('focus'));

    input.value = '123456789';

    input.dispatchEvent(new Event('blur'));

    expect(input.value).toBe('123,456,789');
    expect(myFormControl.value).toBe(123456789);

  });

  it('輸入完 "測試文字"，blur 後應該顯示為 "測試文字" ， 且 formControl 值為 "測試文字" ', () => {

    input.dispatchEvent(new Event('focus'));

    input.value = '測試文字';

    input.dispatchEvent(new Event('blur'));

    expect(input.value).toBe('測試文字');
    expect(myFormControl.value).toBe('測試文字');

  });

  it('當 focus 時，會發出 appOnFocus event ， 且 formControl 會是 touched', () => {

    const appOnFocusEventSpy = spyOn(testHostComponent.textInputComponent.appOnFocus, 'emit');

    expect(appOnFocusEventSpy).not.toHaveBeenCalled();
    expect(appOnFocusEventSpy).toHaveBeenCalledTimes(0);
    expect(myFormControl.touched).toBeFalsy();

    input.dispatchEvent(new Event('focus'));

    const emitArgs = appOnFocusEventSpy.calls.mostRecent().args;

    expect(appOnFocusEventSpy).toHaveBeenCalled();
    expect(appOnFocusEventSpy).toHaveBeenCalledTimes(1);
    expect(myFormControl.touched).toBeTruthy();
    expect(emitArgs[0]).toBe(10000);

    input.value = '12345';

    input.dispatchEvent(new Event('blur'));

    input.dispatchEvent(new Event('focus'));

    const emitArgs2 = appOnFocusEventSpy.calls.mostRecent().args;

    expect(appOnFocusEventSpy).toHaveBeenCalled();
    expect(appOnFocusEventSpy).toHaveBeenCalledTimes(2);
    expect(emitArgs2[0]).toBe(12345);
    expect(myFormControl.touched).toBeTruthy();

  });

  it('當 blur 時，會發出 appOnBlur event ， 且 formControl 值會被改變', () => {

    const appOnBlurEventSpy = spyOn(testHostComponent.textInputComponent.appOnBlur, 'emit');

    expect(appOnBlurEventSpy).not.toHaveBeenCalled();
    expect(appOnBlurEventSpy).toHaveBeenCalledTimes(0);
    expect(myFormControl.value).toBe(10000);

    input.dispatchEvent(new Event('focus'));

    input.value = '123456';

    input.dispatchEvent(new Event('blur'));

    const emitArgs = appOnBlurEventSpy.calls.mostRecent().args;

    expect(appOnBlurEventSpy).toHaveBeenCalled();
    expect(appOnBlurEventSpy).toHaveBeenCalledTimes(1);
    expect(emitArgs[0]).toBe(123456);

  });

  it('當外層的 formControl 被改變時， input 應該轉換正確的顯示', () => {
    myFormControl.setValue('1234567890');
    expect(input.value).toBe('1,234,567,890');
  });

  it('formatCurrency 應該正確轉換相關帶入的值', () => {
    expect(testHostComponent.textInputComponent.formatCurrency('測試文字')).toBe('測試文字');
    expect(testHostComponent.textInputComponent.formatCurrency('123456')).toBe('123,456');
  });

});
