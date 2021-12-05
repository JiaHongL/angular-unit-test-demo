import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info-area',
  templateUrl: './user-info-area.component.html',
  styleUrls: ['./user-info-area.component.scss']
})
export class UserInfoAreaComponent implements OnInit {

  userName = 'JiaHongL';

  constructor() { }

  ngOnInit() {
  }

  onload(data: any): void {
    console.log(data);
  }

}
