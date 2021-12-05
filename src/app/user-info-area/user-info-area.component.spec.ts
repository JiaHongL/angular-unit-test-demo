/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserInfoAreaComponent } from './user-info-area.component';
import { ButtonComponent } from '../button/button.component';
import { UserInfoComponent } from '../user-info/user-info.component';

describe('UserInfoAreaComponent', () => {
  let component: UserInfoAreaComponent;
  let fixture: ComponentFixture<UserInfoAreaComponent>;

  let userInfoComponent: UserInfoComponent = null;

  let btn: HTMLButtonElement = null;
  let btn2: ButtonComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInfoAreaComponent, ButtonComponent, UserInfoComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(UserInfoAreaComponent);

    component = fixture.componentInstance;

    userInfoComponent = fixture.debugElement.query(By.directive(UserInfoComponent)).componentInstance;

    // 第一種方式，抓到 app-button 元件內的 button
    btn = fixture.debugElement.queryAll(By.directive(ButtonComponent)).find(n => n.nativeNode.innerText === 'Joe').nativeElement.querySelector('button');

    // 第二種方式，抓到 app-button 元件本身
    btn2 = fixture.debugElement.queryAll(By.directive(ButtonComponent)).find(n => n.nativeNode.innerText === 'Kyle Simpson').componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('userName 預設值為 "JiaHongL"', () => {
    expect(component.userName).toBe('JiaHongL');
  });

  it('點擊 btn 可以切換 userName', () => {

    expect(component.userName).toBe('JiaHongL');

    btn2.buttonClick.emit({});

    expect(component.userName).toBe('getify');

    btn.click();

    expect(component.userName).toBe('JiaHongL');

  });

  it('[第一種方式] 確認有正確的綁定 @Input', () => {

    expect(userInfoComponent.userName).toBe('JiaHongL');

    btn2.buttonClick.emit({});

    fixture.detectChanges();

    expect(userInfoComponent.userName).toBe('getify');

    btn.click();

    fixture.detectChanges();

    expect(userInfoComponent.userName).toBe('JiaHongL');
  });

  it('[第二種方式] 確認有正確的綁定 @Input', () => {

    const userNameInputSpy = spyOnProperty(userInfoComponent, 'userName', 'set');

    btn2.buttonClick.emit({});

    fixture.detectChanges();

    expect(userNameInputSpy).toHaveBeenCalledWith('getify');
    expect(userNameInputSpy).toHaveBeenCalledTimes(1);

    btn.click();

    fixture.detectChanges();

    expect(userNameInputSpy).toHaveBeenCalledWith('JiaHongL');
    expect(userNameInputSpy).toHaveBeenCalledTimes(2);


  });

  it('確認有正確的綁定 @output', () => {

    const onloadSpy = spyOn(component, 'onload');

    expect(onloadSpy).not.toHaveBeenCalled();

    userInfoComponent.onload.emit('testData');

    expect(onloadSpy).toHaveBeenCalledOnceWith('testData');

  });


});
