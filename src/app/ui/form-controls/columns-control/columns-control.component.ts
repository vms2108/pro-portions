import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';
import { Column } from 'src/app/ui/common/column';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-columns-control',
  templateUrl: './columns-control.component.html',
  styleUrls: ['./columns-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColumnsControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ColumnsControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnsControlComponent extends SimpleFormControlBaseComponent<string[], Column[]> implements OnChanges  {

  @Input()
  public columns: Column[] = [];

  @Input()
  public defaultOptionMessage = 'Не найдено';

  @Output()
  public readonly searchChange = new EventEmitter<string>();

  public labels: string[] = [];

  protected readonly validatorKey = 'app-columns-control';

  constructor(
    public formBuilder: FormBuilder,
    public changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public ngOnChanges(): void {
    this.refreshNicknames();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: string[] | null): Column[] | null {
    if (!inputData || !inputData.length || !this.columns.length) {
      return null;
    }

    return inputData.map(item => this.columns.find(column => column.label === item)!);
  }

  public createInputDataFromValue(value: Column[] | null): string[] | null {
    if (!value || !value.length) {
      return null;
    }
    return value.map(column => `${column.label}`);
  }

  private refreshNicknames(): void {
    if (this.columns && this.columns.length) {
      this.labels = this.columns.map(column => `${column.label}`);
    } else {
      this.labels = [];
    }
    this.changeDetectorRef.markForCheck();
  }
}
