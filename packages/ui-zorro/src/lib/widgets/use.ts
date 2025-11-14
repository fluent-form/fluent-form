import { ValidatorFn, Validators } from '@angular/forms';
import { FluentFormWidgetConfig, SchemaType, isNumber } from '@fluent-form/core';
import {
  AlertComponentSchema,
  ButtonComponentSchema,
  ButtonGroupComponentSchema,
  CardComponentSchema,
  CardsArraySchema,
  CascaderControlSchema,
  CheckboxControlSchema,
  CheckboxGroupControlSchema,
  ColorPickerControlSchema,
  DatePickerControlSchema,
  DateRangePickerControlSchema,
  FormArraySchema,
  FormGroupSchema,
  HeadingComponentSchema,
  IconComponentSchema,
  NumberFieldControlSchema,
  RadioGroupControlSchema,
  RateControlSchema,
  SegmentedControlSchema,
  SelectControlSchema,
  SliderControlSchema,
  SpaceCompactComponentSchema,
  SpaceComponentSchema,
  StepComponentSchema,
  StepsComponentSchema,
  TabComponentSchema,
  TableArraySchema,
  TableColumnSchema,
  TableRowGroupSchema,
  TabsArraySchema,
  TabsComponentSchema,
  TextAreaControlSchema,
  TextFieldControlSchema,
  TimePickerControlSchema,
  ToggleControlSchema,
  TransferControlSchema,
  TreeSelectControlSchema
} from '../schemas';

export function useAllWidgets() {
  return [
    useTextFieldWidget(),
    useTextAreaWidget(),
    useNumberFieldWidget(),
    useDatePickerWidget(),
    useDateRangePickerWidget(),
    useTimePickerWidget(),
    useToggleWidget(),
    useSelectWidget(),
    useCascaderWidget(),
    useTreeSelectWidget(),
    useSliderWidget(),
    useRadioGroupWidget(),
    useCheckboxWidget(),
    useCheckboxGroupWidget(),
    useRateWidget(),
    useTransferWidget(),
    useColorPickerWidget(),
    useSegmentedWidget(),

    useHeadingWidget(),

    useSpaceWidget(),
    useSpaceCompactWidget(),

    useButtonWidget(),
    useAlertWidget(),
    useIconWidget(),

    useButtonGroupWidget(),

    useStepsWidget(),
    useTabsWidget(),

    useFormGroupWidget(),
    useFormArrayWidget(),
    useTableArrayWidget(),
    useTabsArrayWidget(),
    useCardsArrayWidget()
  ];
}

function validatorsOfTextControl(schema: TextFieldControlSchema | TextAreaControlSchema) {
  const validators: ValidatorFn[] = [];

  if (schema.length) {
    if (isNumber(schema.length)) {
      validators.push(
        Validators.minLength(schema.length),
        Validators.maxLength(schema.length)
      );
    } else {
      const { min, max } = schema.length;
      min && validators.push(Validators.minLength(min));
      max && validators.push(Validators.maxLength(max));
    }
  }

  return validators;
}

export function useTextFieldWidget(): FluentFormWidgetConfig<TextFieldControlSchema> {
  return {
    kind: 'text-field',
    type: SchemaType.Control,
    loadWidget: () => import('./text-field/text-field.widget'),
    validators: schema => {
      const validators = validatorsOfTextControl(schema);

      if (schema.type === 'email') {
        validators.push(Validators.email);
      }

      return validators;
    }
  };
}

export function useTextAreaWidget(): FluentFormWidgetConfig<TextAreaControlSchema> {
  return {
    kind: 'text-area',
    type: SchemaType.Control,
    loadWidget: () => import('./text-area/text-area.widget'),
    validators: validatorsOfTextControl
  };
}

export function useNumberFieldWidget(): FluentFormWidgetConfig<NumberFieldControlSchema> {
  return {
    kind: 'number-field',
    type: SchemaType.Control,
    loadWidget: () => import('./number-field/number-field.widget')
  };
}

export function useDatePickerWidget(): FluentFormWidgetConfig<DatePickerControlSchema> {
  return {
    kind: 'date-picker',
    type: SchemaType.Control,
    loadWidget: () => import('./date-picker/date-picker.widget'),
    patch: schema => {
      schema.mapper ??= {
        parser: (value: string | number | Date) => value ? new Date(value) : null,
        formatter: value => {
          if (!value) return null;
          return schema.time ? value.getTime() : new Date(value).setHours(0, 0, 0, 0);
        }
      };
      return schema;
    }
  };
}

export function useDateRangePickerWidget(): FluentFormWidgetConfig<DateRangePickerControlSchema> {
  return {
    kind: 'date-range-picker',
    type: SchemaType.Control,
    loadWidget: () => import('./date-range-picker/date-range-picker.widget'),
    patch: schema => {
      schema.mapper ??= {
        parser: (value: [string | number | Date, string | number | Date]) => value?.map(o => new Date(o)) as [Date, Date] ?? null,
        formatter: value => {
          if (!value) return null;
          return value.map(date => schema.time ? date.getTime() : new Date(date).setHours(0, 0, 0, 0));
        }
      };
      return schema;
    }
  };
}

export function useTimePickerWidget(): FluentFormWidgetConfig<TimePickerControlSchema> {
  return {
    kind: 'time-picker',
    type: SchemaType.Control,
    loadWidget: () => import('./time-picker/time-picker.widget'),
    patch: schema => {
      schema.mapper ??= {
        parser: (value: string | number | Date) => value ? new Date(value) : null,
        formatter: value => value?.getTime() ?? null
      };
      return schema;
    }
  };
}

export function useToggleWidget(): FluentFormWidgetConfig<ToggleControlSchema> {
  return {
    kind: 'toggle',
    type: SchemaType.Control,
    loadWidget: () => import('./toggle/toggle.widget')
  };
}

export function useSelectWidget(): FluentFormWidgetConfig<SelectControlSchema> {
  return {
    kind: 'select',
    type: SchemaType.Control,
    loadWidget: () => import('./select/select.widget')
  };
}

export function useCascaderWidget(): FluentFormWidgetConfig<CascaderControlSchema> {
  return {
    kind: 'cascader',
    type: SchemaType.Control,
    loadWidget: () => import('./cascader/cascader.widget')
  };
}

export function useTreeSelectWidget(): FluentFormWidgetConfig<TreeSelectControlSchema> {
  return {
    kind: 'tree-select',
    type: SchemaType.Control,
    loadWidget: () => import('./tree-select/tree-select.widget')
  };
}

export function useSliderWidget(): FluentFormWidgetConfig<SliderControlSchema> {
  return {
    kind: 'slider',
    type: SchemaType.Control,
    loadWidget: () => import('./slider/silder.widget')
  };
}

export function useRadioGroupWidget(): FluentFormWidgetConfig<RadioGroupControlSchema> {
  return {
    kind: 'radio-group',
    type: SchemaType.Control,
    loadWidget: () => import('./radio-group/radio-group.widget')
  };
}

export function useCheckboxWidget(): FluentFormWidgetConfig<CheckboxControlSchema> {
  return {
    kind: 'checkbox',
    type: SchemaType.Control,
    loadWidget: () => import('./checkbox/checkbox.widget')
  };
}

export function useCheckboxGroupWidget(): FluentFormWidgetConfig<CheckboxGroupControlSchema> {
  return {
    kind: 'checkbox-group',
    type: SchemaType.Control,
    loadWidget: () => import('./checkbox-group/checkbox-group.widget')
  };
}

export function useRateWidget(): FluentFormWidgetConfig<RateControlSchema> {
  return {
    kind: 'rate',
    type: SchemaType.Control,
    loadWidget: () => import('./rate/rate.widget')
  };
}

export function useTransferWidget(): FluentFormWidgetConfig<TransferControlSchema> {
  return {
    kind: 'transfer',
    type: SchemaType.Control,
    loadWidget: () => import('./transfer/transfer.widget')
  };
}

export function useColorPickerWidget(): FluentFormWidgetConfig<ColorPickerControlSchema> {
  return {
    kind: 'color-picker',
    type: SchemaType.Control,
    loadWidget: () => import('./color-picker/color-picker.widget')
  };
}

export function useSegmentedWidget(): FluentFormWidgetConfig<SegmentedControlSchema> {
  return {
    kind: 'segmented',
    type: SchemaType.Control,
    loadWidget: () => import('./segmented/segmented.widget')
  };
}

export function useHeadingWidget(): FluentFormWidgetConfig<HeadingComponentSchema> {
  return {
    kind: 'heading',
    type: SchemaType.Component,
    loadWidget: () => import('./heading/heading.widget'),
    patch: schema => {
      schema.col ??= 12;
      return schema;
    }
  };
}

export function useSpaceWidget(): FluentFormWidgetConfig<SpaceComponentSchema> {
  return {
    kind: 'space',
    type: SchemaType.ControlWrapper,
    loadWidget: () => import('./space/space.widget')
  };
}

export function useSpaceCompactWidget(): FluentFormWidgetConfig<SpaceCompactComponentSchema> {
  return {
    kind: 'space-compact',
    type: SchemaType.ControlWrapper,
    loadWidget: () => import('./space-compact/space-compact.widget')
  };
}

export function useAlertWidget(): FluentFormWidgetConfig<AlertComponentSchema> {
  return {
    kind: 'alert',
    type: SchemaType.Component,
    loadWidget: () => import('./alert/alert.widget'),
    patch: schema => {
      schema.col ??= 12;
      return schema;
    }
  };
}

export function useIconWidget(): FluentFormWidgetConfig<IconComponentSchema> {
  return {
    kind: 'icon',
    type: SchemaType.Component,
    loadWidget: () => import('./icon/icon.widget')
  };
}

export function useButtonWidget(): FluentFormWidgetConfig<ButtonComponentSchema> {
  return {
    kind: 'button',
    type: SchemaType.Component,
    loadWidget: () => import('./button/button.widget'),
    patch: schema => {
      if (schema.variants?.block) {
        schema.col ??= 12;
      }
      return schema;
    }
  };
}

export function useButtonGroupWidget(): FluentFormWidgetConfig<ButtonGroupComponentSchema> {
  return {
    kind: 'button-group',
    type: SchemaType.ComponentWrapper,
    loadWidget: () => import('./button-group/button-group.widget')
  };
}

export function useStepsWidget(): [FluentFormWidgetConfig<StepsComponentSchema>, FluentFormWidgetConfig<StepComponentSchema>] {
  return [
    {
      kind: 'steps',
      type: SchemaType.ComponentContainer,
      loadWidget: () => import('./steps/steps.widget')
    },
    {
      kind: 'step',
      type: SchemaType.ComponentContainer
    }
  ];
}

export function useTabsWidget(): [FluentFormWidgetConfig<TabsComponentSchema>, FluentFormWidgetConfig<TabComponentSchema>] {
  return [
    {
      kind: 'tabs',
      type: SchemaType.ComponentContainer,
      loadWidget: () => import('./tabs/tabs.widget')
    },
    {
      kind: 'tab',
      type: SchemaType.ComponentContainer
    }
  ];
}

export function useFormGroupWidget(): FluentFormWidgetConfig<FormGroupSchema> {
  return {
    kind: 'group',
    type: SchemaType.ControlGroup,
    loadWidget: () => import('./form-group/form-group.widget')
  };
}

export function useFormArrayWidget(): FluentFormWidgetConfig<FormArraySchema> {
  return {
    kind: 'array',
    type: SchemaType.ControlArray,
    loadWidget: () => import('./form-array/form-array.widget')
  };
}

export function useTableArrayWidget(): [
  FluentFormWidgetConfig<TableArraySchema>,
  FluentFormWidgetConfig<TableRowGroupSchema>,
  FluentFormWidgetConfig<TableColumnSchema>
] {
  return [
    {
      kind: 'table-array',
      type: SchemaType.ControlArray,
      loadWidget: () => import('./table-array/table-array.widget')
    },
    {
      kind: 'table-row-group',
      type: SchemaType.ControlGroup
    },
    {
      kind: 'table-column',
      type: SchemaType.ControlWrapper
    }
  ];
}

export function useTabsArrayWidget(): FluentFormWidgetConfig<TabsArraySchema> {
  return {
    kind: 'tabs-array',
    type: SchemaType.ControlArray,
    loadWidget: () => import('./tabs-array/tabs-array.widget')
  };
}

export function useCardsArrayWidget(): [FluentFormWidgetConfig<CardsArraySchema>, FluentFormWidgetConfig<CardComponentSchema>] {
  return [
    {
      kind: 'cards-array',
      type: SchemaType.ControlArray,
      loadWidget: () => import('./cards-array/cards-array.widget')
    },
    {
      kind: 'card',
      type: SchemaType.ComponentContainer
    }
  ];
}
