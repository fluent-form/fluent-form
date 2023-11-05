---
title: 排版与布局
order: 2
---

`<fluent-form>` 组件的表单布局是基于[栅格布局（grid）](https://ng.ant.design/components/grid/zh)构建的。

## 栅格布局

使用 `<fluent-form>` 组件的 `justify` 和 `align` 参数来配置顶层栅格的行为。

<example name="fluent-form-grid-layout-example" />

## 栅格列

在表单中，每个组件或控件都是行（row）内的一列（column），每个图示都可以使用 `col` 选项来配置列的 flex、offset、span 等属性。

<example name="fluent-form-grid-column-example" />

## 栅格行

使用 `row()` 组件创建新的栅格行。

<example name="fluent-form-grid-row-example" />
