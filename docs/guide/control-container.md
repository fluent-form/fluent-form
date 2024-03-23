---
title: 控件容器
order: 4
---

`ngx-fluent-form` 目前支持 `FormGroup` 与 `FormArray` 两种控件容器。

## 表单组

使用 `group()` 控件容器来配置嵌套的表单组，支持多级嵌套。

- 使用 `schemas` 选项配置表单组的子图示。

<example name="fluent-form-form-group-example" />

## 表单数组

### 列表型

使用 `array()` 控件容器，您可以轻松地配置列表型的数组表单，支持增减元素、多级嵌套、拖拽排序以及长度限制。

- 使用 `length` 选项配置数组元素长度限制，支持传入一个数字或一个配置对象。
- 使用 `addable` / `removable` 选项配置是否启用增删元素。
- 使用 `orderable` 选项配置是否启用拖拽排序（目前仅支持一维拖拽，参见 [#13372](https://github.com/angular/components/issues/13372)）。
- 使用 `schemas` 选项配置表单数组的子元素图示。

<example name="fluent-form-form-array-example" />

### 标签页型

使用 `tabsArray()` 控件容器，您可以轻松地配置标签页样式的数组表单，支持增减元素、多级嵌套以及长度限制。

- 使用 `length` 选项配置数组元素长度限制，支持传入一个数字或一个配置对象。
- 使用 `addable` / `removable` 选项配置是否启用增删元素。
- 使用 `schemas` 选项配置表单数组的子元素图示。

<example name="fluent-form-tabs-array-example" />

## 顶层表单

顶层表单本质上也是一个 `FormGroup`，通过 `form()` 函数创建。

若要配置顶层表单的行为，例如验证器和更新时机，您可以通过函数的第二个参数来实现。

<example name="fluent-form-root-form-example" />
