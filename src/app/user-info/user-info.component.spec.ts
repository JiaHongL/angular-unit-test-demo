import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { dematerialize, materialize, of, throwError } from 'rxjs';
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

describe('UserInfoComponent', () => {

  let component: UserInfoComponent;

  let fixture: ComponentFixture<UserInfoComponent>;
  let getUserInfoSpy: jasmine.Spy = null;
  let onloadEmitSpy: jasmine.Spy = null;

  let imgElement: HTMLImageElement = null;
  let cardTitleElement: HTMLElement = null;
  let cardTextElement: HTMLElement = null;
  let textMutedElement: HTMLElement = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      imports: [HttpClientTestingModule],
      // 其它方式：直接替換成另一隻 mock 的 service
      // providers: [
      //   { provide: ApiService, useExisting: MockApiService }
      // ]
    }).compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;

    const apiService: ApiService = TestBed.inject(ApiService);

    getUserInfoSpy = spyOn(apiService, 'getUserInfo');
    onloadEmitSpy = spyOn(component.onload, 'emit');

    // 根據不同傳入的參數，回傳不同的 fake data
    getUserInfoSpy
      // success
      .withArgs('JiaHongL').and.returnValue(
        of(fakeData).pipe(delay(1000))
      )
      // error
      .withArgs('joeeeeeeeeeeeeeeeee').and.returnValue(
        throwError(() => fakeErrorMessage).pipe(
          materialize(),
          delay(1000),
          dematerialize()
        )
      );

    imgElement = fixture.debugElement.nativeElement.querySelector('img');
    cardTitleElement = fixture.debugElement.nativeElement.querySelector('.card-title');
    cardTextElement = fixture.debugElement.nativeElement.querySelector('.card-text');
    textMutedElement = fixture.debugElement.nativeElement.querySelector('.text-muted');

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('當 API 成功回傳後，應該顯示正確的使用者資料', fakeAsync(() => {

    expect(imgElement.src).toBe(window.location.origin + '/');
    expect(cardTitleElement.innerText).toBe('');
    expect(cardTextElement.innerText).toBe('');
    expect(textMutedElement.innerText).toBe('blog :');

    expect(getUserInfoSpy).toHaveBeenCalledTimes(0);
    expect(component.userInfo).toBeNull();
    expect(onloadEmitSpy).toHaveBeenCalledTimes(0);

    component.userName = 'JiaHongL';

    tick(1000);

    fixture.detectChanges();

    const onloadEmitArgs = onloadEmitSpy.calls.mostRecent().args[0];

    expect(getUserInfoSpy).toHaveBeenCalledTimes(1);
    expect(component.userInfo).toBe(fakeData);
    expect(onloadEmitSpy).toHaveBeenCalledTimes(1);
    expect(onloadEmitSpy).toHaveBeenCalledWith(fakeData);
    expect(onloadEmitArgs).toBe(fakeData);

    expect(imgElement.src).toBe(fakeData.avatar_url);
    expect(cardTitleElement.innerText).toBe(fakeData.name);
    expect(cardTextElement.innerText).toBe(fakeData.bio);
    expect(textMutedElement.innerText).toBe('blog : ' + fakeData.blog);

  }));

  it('當 API 查無使用者時，應該使用 alert 跳出 "Not Found" 提示', fakeAsync(() => {

    const alertSpy = spyOn(window, 'alert');

    expect(getUserInfoSpy).not.toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();

    component.userName = 'joeeeeeeeeeeeeeeeee';

    tick(1000);

    expect(getUserInfoSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalled();

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith(fakeErrorMessage.message);

    expect(alertSpy).toHaveBeenCalledOnceWith(fakeErrorMessage.message);

  }));

});
