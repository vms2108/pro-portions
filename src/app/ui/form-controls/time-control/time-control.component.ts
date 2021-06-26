import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SimpleFormControlBaseComponent } from '../../control-base/simple-form-control.base-component';

@Component({
  selector: 'app-time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TimeControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeControlComponent extends SimpleFormControlBaseComponent<string, string> {

  public maskTime = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];

  @Input()
  public placeholder: string | null = '';

  protected readonly validatorKey = 'app-time-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: string | null): string | null {
    let answer = inputData;
    if (inputData && inputData.length > 2 && Number.parseInt(inputData[0] + inputData[1], 10) > 23) {
      answer = inputData.length === 4 ? `23:${inputData[3]}` : inputData.length === 5 ? `23:${inputData[3]}${inputData[4]}` : '23:';
      this.control.setValue(answer);
    }
    return answer;
  }

  public createInputDataFromValue(value: string | null): string | null {
    return value;
  }
}
