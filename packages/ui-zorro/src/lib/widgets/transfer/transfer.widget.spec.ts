import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { TransferChange } from 'ng-zorro-antd/transfer';
import { TransferItemsPipe, TransferWidget } from './transfer.widget';

describe('TransferWidget', () => {
  let component: TransferWidget;
  let fixture: ComponentFixture<TransferWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onChange when the transfer changes', () => {
    const event1: TransferChange = {
      from: 'left',
      to: 'right',
      list: [{ key: '1', title: 'Item 1' }]
    };
    const control1 = new FormControl();

    component.onChange(event1, control1);

    expect(control1.value).toEqual(['1']);

    const event2: TransferChange = {
      from: 'right',
      to: 'left',
      list: [{ key: '1', title: 'Item 1' }]
    };
    const control2 = new FormControl(['1']);

    component.onChange(event2, control2);
    expect(control2.value).toEqual([]);
  });

  it('TransferItemsPipe', () => {
    const pipe = new TransferItemsPipe();
    const items = [
      { label: 'Item 1', value: '1' },
      { label: 'Item 2', value: '2' }
    ];
    const result = pipe.transform(items);
    expect(result).toEqual([
      { key: '1', title: 'Item 1' },
      { key: '2', title: 'Item 2' }
    ]);
  });
});
