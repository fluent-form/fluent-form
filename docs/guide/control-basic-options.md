---
title: 控件基本选项
order: 3
---

本节内容涵盖所有适用于表单控件的基本功能选项。

## 控件标签

通过使用 `label` 选项，您可以传入字符串或者一个对象来完全配置标签的样式。还可以使用 `tooltip` 选项来配置标签旁的提示信息。

<example name="fluent-form-control-label-example" />

## 底部提示

使用 `hint` 选项来配置控件底部的提示信息。

<example name="fluent-form-control-hint-example" />

## 默认值

使用 `defaultValue` 选项来配置控件的默认值。

<example name="fluent-form-control-default-value-example" />

## 禁用控件

使用 `disabled` 选项来禁用控件，配合 `hidden` 选项可达到禁用控件的同时隐藏控件。

<example name="fluent-form-control-disabled-example" />

## 更新时机

使用 `updateOn` 选项来配置控件值的更新时机，支持三种更新时机，默认为 `change`。

<example name="fluent-form-control-update-on-example" />

## 表单验证

- 使用 `required` 选项来设置控件为必填项。
- 使用 `validators`、`asyncValidators` 选项来添加额外的验证器。
- 使用 `feedback` 选项来开启验证状态图标。
- 使用 `tips` 选项来设置验证提示，支持设置五种提示，分别有：`success` 、`warning`、`error`、`validating`、[`auto`](https://ng.ant.design/components/form/zh#components-form-demo-auto-tips)。
- 使用 `length` 选项来设置 `input()` 和 `textarea()` 控件的输入长度验证。
- 对于 `type` 为 `email` 的 `input()` 控件，会自动添加邮箱验证。
- 如果控件处在 `input-group()` 中，此时只会显示一个控件的验证状态与提示。默认选用组内的第一个控件，可以使用 `primary` 选项指定其他控件。

<example name="fluent-form-form-validation-example" />

## 格式化与解析

<alert type="info">这是一项高级功能，基于此功能我们可以定制一些简单的业务组件。</alert>
<alert type="warning">`ngx-fluent-form` 默认会将日期控件输出的 `Date` 对象转为时间戳，可使用 `mapper` 选项覆盖此行为。</alert>

使用 `mapper` 选项来设置控件的输入解析与格式化输出。

例如 `date()` 控件将输出 `Date` 对象，但我们期望从输出中得到日期字符串：

<example name="fluent-form-control-mapper-example" />

## 多字段控件

部分控件的控件值为一个数组，例如 `dateRange()`、`cascader()` 控件等。

我们可以将数组里的每一个元素映射到模型（model）的多个**属性**当中，只需将一个字符串数组作为控件的 `key` 即可。

<example name="fluent-form-control-multi-key-example" />

## 表单联动

部分组件/控件的选项支持传入一个函数，以实现控件之间的联动。该函数接受一个对象作为输入参数，对象类型为 `{ model, control, schema }`。

并非所有选项都支持联动，我们仅会对必要的选项支持此功能，您可以根据选项的类型判断是否支持该联动。

<example name="fluent-form-control-linkage-example" />

## 选择器控件

### 远程数据

一个带有远程搜索，节流控制，请求时序控制，加载状态的示例。

<example name="fluent-form-select-remote-data-example" />

### 自定义视图

使用 `option` 选项自定义选项视图。

<example name="fluent-form-select-custom-option-content-example" />
