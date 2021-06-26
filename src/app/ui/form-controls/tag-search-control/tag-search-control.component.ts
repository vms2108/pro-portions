import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'app-tag-search-control',
  templateUrl: './tag-search-control.component.html',
  styleUrls: ['./tag-search-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagSearchControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TagSearchControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagSearchControlComponent extends SimpleFormControlBaseComponent<string[], string[]>{

  @Input()
  public placeholder: string | null = null;

  @Input()
  public items!: string[];

  @Input()
  public maxItems = 999;

  @Input()
  public editable = false;

  @Input()
  public dragZone = 'test';

  protected readonly validatorKey = 'app-tag-search-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: string[] | null): string[] | null {
    return inputData;
  }

  public createInputDataFromValue(value: string[] | null): string[] | null {
    return value;
  }
}
