import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { of, throwError } from 'rxjs';
import { delay } from 'rxjs';

import { ApiService, UserInfo } from '../api/api.service';

import { UserInfoComponent } from './user-info.component';

const fakeData: UserInfo = {
  login: 'JiaHongL',
  id: 6601449,
  node_id: 'MDQ6VXNlcjY2MDE0NDk=',
  avatar_url: 'https://avatars.githubusercontent.com/u/6601449?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/JiaHongL',
  html_url: 'https://github.com/JiaHongL',
  followers_url: 'https://api.github.com/users/JiaHongL/followers',
  following_url: 'https://api.github.com/users/JiaHongL/following{/other_user}',
  gists_url: 'https://api.github.com/users/JiaHongL/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/JiaHongL/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/JiaHongL/subscriptions',
  organizations_url: 'https://api.github.com/users/JiaHongL/orgs',
  repos_url: 'https://api.github.com/users/JiaHongL/repos',
  events_url: 'https://api.github.com/users/JiaHongL/events{/privacy}',
  received_events_url: 'https://api.github.com/users/JiaHongL/received_events',
  type: 'User',
  site_admin: false,
  name: 'Joe',
  company: null as any,
  blog: 'http://jhlstudy.blogspot.tw/',
  location: 'Taipei',
  email: null as any,
  hireable: null as any,
  bio: 'frontend developer',
  twitter_username: null as any,
  public_repos: 39,
  public_gists: 0,
  followers: 14,
  following: 10,
  created_at: '2014-02-06T03:50:32Z',
  updated_at: '2021-10-29T13:12:58Z'
};

const fakeErrorMessage = {
  message: 'Not Found',
  documentation_url: 'https://docs.github.com/rest/reference/users#get-a-user'
};

fdescribe('UserInfoComponent', () => {

  let component: UserInfoComponent;

  let fixture: ComponentFixture<UserInfoComponent>;
  let getUserInfoSpy: jasmine.Spy = null;

  let imgElement: HTMLImageElement = null;
  let cardTitleElement: HTMLElement = null;
  let cardTextElement: HTMLElement = null;
  let textMutedElement: HTMLElement = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(UserInfoComponent);

    component = fixture.componentInstance;

    const apiService: ApiService = TestBed.inject(ApiService);

    getUserInfoSpy = spyOn(apiService, 'getUserInfo');

    // 根據不同傳入的參數，回傳不同的 fake data
    getUserInfoSpy
      .withArgs('JiaHongL').and.returnValue(of(fakeData).pipe(delay(1000)))
      .withArgs('joeeeeeeeeeeeeeeeee').and.returnValue(throwError(() => fakeErrorMessage).pipe(delay(1000)));

    imgElement = fixture.debugElement.nativeElement.querySelector('img');
    cardTitleElement = fixture.debugElement.nativeElement.querySelector('.card-title');
    cardTextElement = fixture.debugElement.nativeElement.querySelector('.card-text');
    textMutedElement = fixture.debugElement.nativeElement.querySelector('.text-muted');

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[第一種方式] 當 API 成功回傳後，應該顯示正確的使用者資料', fakeAsync(() => {

    expect(imgElement.src).toBe(window.location.origin + '/');
    expect(cardTitleElement.innerText).toBe('');
    expect(cardTextElement.innerText).toBe('');
    expect(textMutedElement.innerText).toBe('blog :');

    expect(component.userInfo).toBeNull();

    component.userName = 'JiaHongL';

    tick(1000);

    fixture.detectChanges();

    expect(component.userInfo).toBe(fakeData);

    expect(imgElement.src).toBe(fakeData.avatar_url);
    expect(cardTitleElement.innerText).toBe(fakeData.name);
    expect(cardTextElement.innerText).toBe(fakeData.bio);
    expect(textMutedElement.innerText).toBe('blog : ' + fakeData.blog);

  }));

  // TODO: 待確認 為何 angular 13 的 waitForAsync 會無效
  // 已知 原本 @angular/core/testing 提供的 async 之前可以使用，後來因為跟原生撞名 ，所以某個版本後使用 waitForAsync
  // 問題： 雖然使用 whenStable 會等待異步回應後才斷言，但值卻沒有變
  it('使用 waitForAsync 等待異步完成', waitForAsync(() => {

    let a = 1;

    setTimeout(() => {
      a = 2;
    }, 2000);

    fixture.whenStable().then(() => {
      expect(a).toBe(2);
    });

  }));

  it('[第二種方式] 當 API 成功回傳後，應該顯示正確的使用者資料', waitForAsync(() => {

    expect(imgElement.src).toBe(window.location.origin + '/');
    expect(cardTitleElement.innerText).toBe('');
    expect(cardTextElement.innerText).toBe('');
    expect(textMutedElement.innerText).toBe('blog :');

    expect(component.userInfo).toBeNull();

    component.userName = 'JiaHongL';

    fixture.whenStable().then(() => {

      fixture.detectChanges();

      expect(component.userInfo).toBe(fakeData);

      expect(imgElement.src).toBe(fakeData.avatar_url);
      expect(cardTitleElement.innerText).toBe(fakeData.name);
      expect(cardTextElement.innerText).toBe(fakeData.bio);
      expect(textMutedElement.innerText).toBe('blog : ' + fakeData.blog);

    });

  }));

  it('當 API 查無使用者時，應該使用 alert 跳出 "Not Found" 提示', () => {

    const alertSpy = spyOn(window, 'alert');

    expect(alertSpy).not.toHaveBeenCalled();

    component.userName = 'joeeeeeeeeeeeeeeeee';

    fixture.detectChanges();

    expect(alertSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(fakeErrorMessage.message);

  });

});
