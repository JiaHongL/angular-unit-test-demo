import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @ViewChild('btn', { static: true }) button: ElementRef;

  @Input() disabled = false;

  @Input('class') set class(value: string) {
    const classList = value.split(' ');
    setTimeout(() => {
      const buttonClassList = this.button.nativeElement.classList;
      classList.forEach((className) => {
        buttonClassList.add(className);
      });
    });
  }

@Input() color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
    | '' = 'primary';

  @Output() buttonClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  get classMap(): { [key: string]: boolean } {
    return {
      ['btn-primary']: this.color === 'primary',
      ['btn-secondary']: this.color === 'secondary',
      ['btn-success']: this.color === 'success',
      ['btn-danger']: this.color === 'danger',
      ['btn-warning']: this.color === 'warning',
      ['btn-info']: this.color === 'info',
      ['btn-light']: this.color === 'light',
      ['btn-dark']: this.color === 'dark',
      ['btn-link']: this.color === 'link',
    };
  }

}
