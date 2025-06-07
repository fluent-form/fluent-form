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
  TabsArraySchema,
  TabsComponentSchema,
  TextAreaControlSchema,
  TextFieldControlSchema,
  TimePickerControlSchema,
  ToggleControlSchema,
  TransferControlSchema,
  TreeSelectControlSchema
} from '../schemas';
import { AlertWidget } from './alert/alert.widget';
import { ButtonGroupWidget } from './button-group/button-group.widget';
import { ButtonWidget } from './button/button.widget';
import { CardsArrayWidget } from './cards-array/cards-array.widget';
import { CascaderWidget } from './cascader/cascader.widget';
import { CheckboxGroupWidget } from './checkbox-group/checkbox-group.widget';
import { CheckboxWidget } from './checkbox/checkbox.widget';
import { DatePickerWidget } from './date-picker/date-picker.widget';
import { DateRangePickerWidget } from './date-range-picker/date-range-picker.widget';
import { FormArrayWidget } from './form-array/form-array.widget';
import { FormGroupWidget } from './form-group/form-group.widget';
import { HeadingWidget } from './heading/heading.widget';
import { IconWidget } from './icon/icon.widget';
import { NumberFieldWidget } from './number-field/number-field.widget';
import { RadioGroupWidget } from './radio-group/radio-group.widget';
import { RateWidget } from './rate/rate.widget';
import { SegmentedWidget } from './segmented/segmented.widget';
import { SelectWidget } from './select/select.widget';
import { SilderWidget } from './slider/silder.widget';
import { SpaceCompactWidget } from './space-compact/space-compact.widget';
import { SpaceWidget } from './space/space.widget';
import { StepsWidget } from './steps/steps.widget';
import { TabsArrayWidget } from './tabs-array/tabs-array.widget';
import { TabsWidget } from './tabs/tabs.widget';
import { TextAreaWidget } from './text-area/text-area.widget';
import { TextFieldWidget } from './text-field/text-field.widget';
import { TimePickerWidget } from './time-picker/time-picker.widget';
import { ToggleWidget } from './toggle/toggle.widget';
import { TransferWidget } from './transfer/transfer.widget';
import { TreeSelectWidget } from './tree-select/tree-select.widget';

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
    // useColorPickerWidget(),
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
    widget: TextFieldWidget,
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
    widget: TextAreaWidget,
    validators: validatorsOfTextControl
  };
}

export function useNumberFieldWidget(): FluentFormWidgetConfig<NumberFieldControlSchema> {
  return {
    kind: 'number-field',
    type: SchemaType.Control,
    widget: NumberFieldWidget
  };
}

export function useDatePickerWidget(): FluentFormWidgetConfig<DatePickerControlSchema> {
  return {
    kind: 'date-picker',
    type: SchemaType.Control,
    widget: DatePickerWidget,
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
    widget: DateRangePickerWidget,
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
    widget: TimePickerWidget,
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
    widget: ToggleWidget
  };
}

export function useSelectWidget(): FluentFormWidgetConfig<SelectControlSchema> {
  return {
    kind: 'select',
    type: SchemaType.Control,
    widget: SelectWidget
  };
}

export function useCascaderWidget(): FluentFormWidgetConfig<CascaderControlSchema> {
  return {
    kind: 'cascader',
    type: SchemaType.Control,
    widget: CascaderWidget
  };
}

export function useTreeSelectWidget(): FluentFormWidgetConfig<TreeSelectControlSchema> {
  return {
    kind: 'tree-select',
    type: SchemaType.Control,
    widget: TreeSelectWidget
  };
}

export function useSliderWidget(): FluentFormWidgetConfig<SliderControlSchema> {
  return {
    kind: 'slider',
    type: SchemaType.Control,
    widget: SilderWidget
  };
}

export function useRadioGroupWidget(): FluentFormWidgetConfig<RadioGroupControlSchema> {
  return {
    kind: 'radio-group',
    type: SchemaType.Control,
    widget: RadioGroupWidget
  };
}

export function useCheckboxWidget(): FluentFormWidgetConfig<CheckboxControlSchema> {
  return {
    kind: 'checkbox',
    type: SchemaType.Control,
    widget: CheckboxWidget
  };
}

export function useCheckboxGroupWidget(): FluentFormWidgetConfig<CheckboxGroupControlSchema> {
  return {
    kind: 'checkbox-group',
    type: SchemaType.Control,
    widget: CheckboxGroupWidget
  };
}

export function useRateWidget(): FluentFormWidgetConfig<RateControlSchema> {
  return {
    kind: 'rate',
    type: SchemaType.Control,
    widget: RateWidget
  };
}

export function useTransferWidget(): FluentFormWidgetConfig<TransferControlSchema> {
  return {
    kind: 'transfer',
    type: SchemaType.Control,
    widget: TransferWidget
  };
}

// export function useColorPickerWidget(): FluentFormWidgetConfig<ColorPickerControlSchema> {
//   return {
//     kind: 'color-picker',
//     type: SchemaType.Control,
//     widget: ColorPickerWidget
//   };
// }

export function useSegmentedWidget(): FluentFormWidgetConfig<SegmentedControlSchema> {
  return {
    kind: 'segmented',
    type: SchemaType.Control,
    widget: SegmentedWidget
  };
}

export function useHeadingWidget(): FluentFormWidgetConfig<HeadingComponentSchema> {
  return {
    kind: 'heading',
    type: SchemaType.Component,
    widget: HeadingWidget,
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
    widget: SpaceWidget
  };
}

export function useSpaceCompactWidget(): FluentFormWidgetConfig<SpaceCompactComponentSchema> {
  return {
    kind: 'space-compact',
    type: SchemaType.ControlWrapper,
    widget: SpaceCompactWidget
  };
}

export function useAlertWidget(): FluentFormWidgetConfig<AlertComponentSchema> {
  return {
    kind: 'alert',
    type: SchemaType.Component,
    widget: AlertWidget,
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
    widget: IconWidget
  };
}

export function useButtonWidget(): FluentFormWidgetConfig<ButtonComponentSchema> {
  return {
    kind: 'button',
    type: SchemaType.Component,
    widget: ButtonWidget,
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
    widget: ButtonGroupWidget
  };
}

export function useStepsWidget(): [FluentFormWidgetConfig<StepsComponentSchema>, FluentFormWidgetConfig<StepComponentSchema>] {
  return [
    {
      kind: 'steps',
      type: SchemaType.ComponentContainer,
      widget: StepsWidget
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
      widget: TabsWidget
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
    widget: FormGroupWidget
  };
}

export function useFormArrayWidget(): FluentFormWidgetConfig<FormArraySchema> {
  return {
    kind: 'array',
    type: SchemaType.ControlArray,
    widget: FormArrayWidget
  };
}

export function useTabsArrayWidget(): FluentFormWidgetConfig<TabsArraySchema> {
  return {
    kind: 'tabs-array',
    type: SchemaType.ControlArray,
    widget: TabsArrayWidget
  };
}

export function useCardsArrayWidget(): [FluentFormWidgetConfig<CardsArraySchema>, FluentFormWidgetConfig<CardComponentSchema>] {
  return [
    {
      kind: 'cards-array',
      type: SchemaType.ControlArray,
      widget: CardsArrayWidget
    },
    {
      kind: 'card',
      type: SchemaType.ComponentContainer
    }
  ];
}
