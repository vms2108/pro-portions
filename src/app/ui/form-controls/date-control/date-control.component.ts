import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Injectable, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import * as moment_ from 'moment';

import { SimpleFormControlBaseComponent } from '../../control-base/simple-form-control.base-component';

import { NotificationsService } from './../../notifications/notifications.service';

const moment = moment_;

const MY_DATE_FORMATS = {
  parse: {
    dateInput: ['MM.YYYY', 'MMMM YYYY'],
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MM.YYYY',
    dateA11yLabel: 'DD.MM.YYY',
    monthYearA11yLabel: 'DD.MM.YYYY',
  },
};

@Injectable()
export class MyDateAdapter extends NativeDateAdapter {

  public parse(value: any): Date | null {

    if ((typeof value === 'string') && (value.indexOf('.') > -1)) {
      const str = value.split('.');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);
      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  public format(date: Date, displayFormat: Object): string {
    const newDate = new Date(Date.UTC(
      date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(),
      date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    const newDisplayFormat = Object.assign({}, displayFormat, { timeZone: 'utc' });

    const dtf = new Intl.DateTimeFormat(this.locale, newDisplayFormat);
    return dtf.format(newDate);
  }
}

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateControlComponent),
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: MyDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS,
    },
  ],
})
export class DateControlComponent extends SimpleFormControlBaseComponent<Date, Date> implements AfterViewInit {

  @Input()
  public placeholder: string | null = null;

  @Input()
  public minDate!: Date;

  @Input()
  public maxDate!: Date;

  @Input()
  public label = '';

  @ViewChild('input', { read: ElementRef })
  public input!: ElementRef;

  public maskDate = [/[0-3]/, /\d/, '.', /[0-1]/, /\d/, '.', /[0-2]/, /\d/, /\d/, /\d/];

  public mask = {
    guide: true,
    showMask : true,
    mask: this.maskDate,
  };

  protected readonly validatorKey = 'app-date-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
    private dateAdapter: DateAdapter<Date>,
    private notificationsService: NotificationsService,
  ) {
    super(formBuilder, changeDetectorRef);
    this.dateAdapter.setLocale('ru');
  }

  public ngAfterViewInit(): void {
    this.input.nativeElement.value = moment(this.control.value).format('DD.MM.YYYY');
  }

  public valuechange(value: string): void {
    if ((typeof value === 'string') && (value.indexOf('.') > -1)) {
      const str = value.split('.');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);
      if (date && month && year) {
        this.control.setValue(new Date(year, month, date));
      }
    }
  }

  public createControl(): FormControl {
    return this.formBuilder.control({ value: null, disabled: false });
  }

  public createValueFromInputData(inputData: Date | null): Date | null {
    this.input.nativeElement.value = moment(inputData).format('DD.MM.YYYY');
    if (inputData && (inputData.getTime() < new Date('01-01-1950').getTime())) {
      this.notificationsService.warning('Перепроверьте дату.');
    }
    return inputData;
  }

  public createInputDataFromValue(value: Date | null): Date | null {
    return value;
  }
}
