---
title: 排版与布局
order: 2
---

`ngx-fluent-form` 集成了一个包含 12 列的栅格系统（Grid System），支持六个屏幕响应断点（xs、sm、md、lg、xl、xxl）。该系统由 `<fluent-row>` 和 `<fluent-col>` 组件构成。表单布局是建立在该栅格系统之上的。

## 栅格列

在表单中，每个组件或控件都是行（row）内的一列（column），每个图示都可以使用 `col` 选项来配置列的 flex、offset、span 等属性。

<example name="fluent-form-grid-column-example" />

## 栅格行

使用 `row()` 组件创建新的栅格行。

<example name="fluent-form-grid-row-example" />

## 栅格布局

使用 `group()` 的 `justify` 和 `align` 选项来配置顶层栅格的行为。

<example name="fluent-form-grid-layout-example" />

## 布局类型

使用 `group()` 的 `layout` 选项来配置表单布局类型，默认为 `vertical`。

<example name="fluent-form-layout-type-example" />
