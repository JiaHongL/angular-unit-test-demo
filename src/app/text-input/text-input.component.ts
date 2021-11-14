import {
  AfterViewInit, Component, ElementRef, EventEmitter, forwardRef,
  Injector, Input, OnInit, Output, Type, ViewChild
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
export const TEXT_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextInputComponent),
  multi: true
};

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [TEXT_INPUT_VALUE_ACCESSOR]
})
export class TextInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  ngControl: NgControl;

  currencyPipe = new CurrencyPipe('en-US');

  @ViewChild('input', { static: false }) input: ElementRef;

  @Input() placeholder = '';

  @Input() disabled = false;

  @Output() appOnFocus = new EventEmitter<any>();

  @Output() appOnBlur = new EventEmitter<any>();

  constructor(
    private inj: Injector
  ) {
  }

  onChange: (value:any) => void;

  onTouched: () => void;

  ngOnInit(): void {
    this.ngControl = this.inj.get<NgControl>(NgControl as Type<NgControl>);
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.value = this.formatCurrency(this.ngControl.control.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(val: any): void {
    if (this.input) {
      this.input.nativeElement.value = this.formatCurrency(val);
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (
      isDisabled && this.ngControl.control.disabled === isDisabled ||
      !isDisabled && this.ngControl.control.enabled === !isDisabled
    ) {
      return;
    }
    this.disabled = isDisabled;
  }

  focus(): void {
    this.onTouched();
    this.input.nativeElement.value = this.ngControl.control.value;
    this.appOnFocus.emit(this.ngControl.control.value);
  }

  blur(): void {
    const newData = this.input.nativeElement.value.replace(/,/g, '');
    this.onChange(!isNaN(Number(newData)) ? Number(newData) : newData);
    this.input.nativeElement.value = this.formatCurrency(this.ngControl.control.value);
    this.appOnBlur.emit(this.ngControl.control.value);
  }

  formatCurrency(data: any): any {
    let newData = data;
    if (!isNaN(Number(data))) {
      newData = this.currencyPipe.transform(data, 'TWD', '', '0.0-9');
    }
    return newData;
  }

}
