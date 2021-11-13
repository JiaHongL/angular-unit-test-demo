import { ApiService, UserInfo } from './../api/api.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userInfo: UserInfo = null;

  // tslint:disable-next-line: variable-name
  private _userName = '';
  @Input() set userName(userName: string) {
    this._userName = userName;
    if (this._userName) {
      this.setUserInfo();
    }
  }

  get userName() {
    return this._userName;
  }

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  setUserInfo(): void {

    this.userInfo = null;

    this.apiService.getUserInfo(this._userName).subscribe((res) => {
      this.userInfo = res;
      console.log('回來了',res);
    }, (error) => {
      alert(error.message);
    });

  }

}
