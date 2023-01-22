import { Provider } from '@angular/core';
import { FluentFormFeature } from './features';
import { WIDGET_MAP } from './tokens';

export function provideFluentForm(...features: FluentFormFeature[] | FluentFormFeature[][]): Provider[] {
  // TODO: 升级到 v15 后使用 https://angular.cn/api/core/makeEnvironmentProviders 进行包装
  return [
    {
      provide: WIDGET_MAP,
      useValue: new Map(
        features.flat().map(feature => [
          feature.kind,
          feature.widget
        ])
      )
    }
  ];
}
