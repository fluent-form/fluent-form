{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

{% include "../../../markdowns/brand.md" %} 默认启用了延迟加载部件，以实现更小的主包体积。

> **NOTE**
> 您可以打开 DevTools 的 Network 面板观察部件的延迟加载效果。

{{ NgDocActions.demo("LazyLoadExampleComponent") }}

## Preloading

默认情况下，延迟加载的部件会在表单首次渲染时按需加载。

虽然懒加载通过延迟模块下载来提高初始加载时间，但表单在首次渲染懒加载的部件时仍然会经历延迟。预加载通过在用户请求之前加载模块来消除这种延迟。

要启用预加载，请在 `provideFluentForm` 中调用 `withPreloading` 特性函数来开启预加载功能。

```ts
import { provideFluentForm, withPreloading } from '@fluent-form/core';

provideFluentForm(
  ...
  withPreloading()
)
```
