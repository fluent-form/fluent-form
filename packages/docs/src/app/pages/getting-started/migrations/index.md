# {{ NgDocPage.title }}

从 `ngx-fluent-form` 升级到 `@fluent-form/core`，您需要手动执行以下迁移。

## 迁移步骤

1. 替换旧依赖：
```bash
> npm rm ngx-fluent-form                        # 删除旧依赖
> npm i @fluent-form/core @fluent-form/ui-zorro # 安装新依赖
```

2. 更新导入点，您通常可以使用 IDE 自动导入功能来完成此迁移:
   - 核心功能相关的 API，请使用 `@fluent-form/core` 导入点。
   - UI 部件相关的 API，请使用 `@fluent-form/ui-zorro` 导入点。

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

5. `inputGroup()` 组件的 `before` 与 `after` 选项合并为 `addons` 选项，`prefix` 与 `suffix` 选项合并为 `affixes` 选项，并将这些选项转移到 `text()` 与 `number()` 控件上：

```diff
- inputGroup().before('before').after('after')
+ text('x').addons({ before: 'before', after: 'after' })

- inputGroup().prefix('prefix').suffix('suffix')
+ text('x').affixes({ prefix: 'prefix', suffix: 'suffix' })
```

6. `inputGroup()`、`numberGroup()` 和 `buttonGroup()` 组件已被移除，您可以使用 `spaceCompact()` 组件代替。
