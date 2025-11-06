import { Component, forwardRef, Injector, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
    selector: 'gueo-error-validation-wrapper',
    templateUrl: './error-validation-wrapper.component.html',
    styleUrls: ['./error-validation-wrapper.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ErrorValidationWrapperComponent),
        },
    ],
    standalone: false
})
export class ErrorValidationWrapperComponent
  implements ControlValueAccessor, OnInit
{
  ngControl: NgControl;
  isDisabled: boolean;

  constructor(private inj: Injector) {}

  ngOnInit() {
    this.ngControl = this.inj.get<NgControl>(NgControl as any);
  }

  writeValue() {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
