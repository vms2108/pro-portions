import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, HostBinding, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { defer } from 'lodash';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'app-number-control',
  templateUrl: './number-control.component.html',
  styleUrls: ['./number-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NumberControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberControlComponent extends SimpleFormControlBaseComponent<string, number> {

  @Input()
  public placeholder: string | null = null;

  @Input()
  public scale: number | null = null;

  protected readonly validatorKey = 'app-number-control';

  private lastKey: string | null = null;

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  @HostBinding('class.has-error')
  public get isIncorrectFormat(): boolean {
    return !!this.control.value && this.lastValue === null;
  }

  public createControl(): FormControl {
    const control = this.formBuilder.control(null);

    const refreshViewSubscription = control.valueChanges.subscribe(() => this.changeDetectorRef.markForCheck());
    this.controlSubscriptions.add(refreshViewSubscription);

    return control;
  }

  public createValueFromInputData(inputData: string | null): number | null {
    if (inputData === null) {
      return null;
    }

    if (!this.checkScaleValid(inputData)) {
      return null;
    }

    const value = Number(inputData.replace(',', '.'));

    return isNaN(value) ? null : value;
  }

  public createInputDataFromValue(value: number | null): string | null {
    if (value === null) {
      return null;
    }

    return String(value);
  }

  // todo: InputEvent
  public checkPastedValue(event: any): void {
    if (event.inputType !== 'insertFromPaste') {
      return;
    }

    const numberExpr = /^\-?\d+((\.|,)\d+)?(e[+\-]\d+)?$/i;
    const input = (<HTMLInputElement> event.target);

    if (!numberExpr.test(input.value) || !this.checkScaleValid(input.value)) {
      input.value = this.lastValue === null ? '' : this.replaceDot(String(this.lastValue));
      event.cancelBubble = true;
      event.preventDefault();

      defer(() => this.control.setValue(input.value));
    }
  }

  public filterInput(event: KeyboardEvent): void {
    const input = (<HTMLInputElement> event.target);
    const rawValue = input.value;

    if (event.key === '.') {
      event.preventDefault();
    }

    if (event.key === ',' && (this.replaceDot(rawValue).includes(',') || this.scale === 0)) {
      event.preventDefault();
    }

    if ((event.key === 'E' || event.key === 'e') && (!rawValue.length || /e/i.test(rawValue))) {
      event.preventDefault();
    }

    if (event.key === '-' && rawValue.length && rawValue[rawValue.length - 1].toLowerCase() !== 'e') {
      event.preventDefault();
    }

    if (event.key === '+' && (!rawValue.length || rawValue[rawValue.length - 1].toLowerCase() !== 'e')) {
      event.preventDefault();
    }

    if (/^\d$/.test(event.key) && !this.checkScaleValid(rawValue + event.key)) {
      event.preventDefault();
    }

    if (
      !event.ctrlKey && !event.altKey && this.lastKey !== 'Meta'
      && event.key.length === 1 && !/^[0-9eE\-+\.,]+$/.test(rawValue + event.key)
    ) {
      event.preventDefault();
    }

    this.lastKey = event.key;
  }

  private checkScaleValid(value: string): boolean {
    if (this.scale === null) {
      return true;
    }

    const parts = this.replaceDot(value).split(',');
    if (parts.length < 2) {
      return true;
    }

    return parts[1].length <= this.scale;
  }

  private replaceDot(value: string): string {
    return value.replace('.', ',');
  }

}
