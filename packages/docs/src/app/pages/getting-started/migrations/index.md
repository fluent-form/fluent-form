# {{ NgDocPage.title }}

从 `ngx-fluent-form` 升级到 `@fluent-form/core`，您需要手动执行以下迁移。

## 迁移步骤

1. 替换旧依赖：
```bash
> npm rm ngx-fluent-form                        # 删除旧依赖
> npm i @fluent-form/core @fluent-form/ui-zorro # 安装新依赖
```

2. 更新导入点，您通常可以使用 IDE 自动导入功能来完成此迁移:
   1. 核心功能相关的 API，请使用 `@fluent-form/core` 导入点。
   2. UI 部件相关的 API，请使用 `@fluent-form/ui-zorro` 导入点。

3. 更新配置：
```diff
- import { withWidgets } from 'ngx-fluent-form';
  provideFluentForm(
-   withWidgets(...)
  )

+ import { withZorro } from '@fluent-form/ui-zorro';
  provideFluentForm(
+   withZorro(...)
  )
```

4. `input()` 控件重命名为 `text()` 控件：
```diff
- input('txt')
+ text('txt')
```

包括 `useInputWidget()` 部件工厂函数，也需要重命名为 `useTextWidget()`：
```diff
  provideFluentForm(
    withZorro([
-    useInputWidget()
    ])
  )

  provideFluentForm(
    withZorro([
+    useTextWidget()
    ])
  )
```

5. `inputGroup()` 与 `numberGroup()` 组件的 `before` 与 `after` 参数合并为 `addons`，`prefix` 与 `suffix` 参数合并为 `affixes` 参数：

```diff
- inputGroup().before('before').after('after')
+ inputGroup().addons({ before: 'before', after: 'after' })

- inputGroup().prefix('prefix').suffix('suffix')
+ inputGroup().affixes({ prefix: 'prefix', suffix: 'suffix' })
```
