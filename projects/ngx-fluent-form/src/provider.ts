import { Provider } from '@angular/core';
import { FluentFormFeature } from './features';

export function provideFluentForm(...features: FluentFormFeature[]): Provider[] {
  // TODO: 升级到 v15 后使用 https://angular.cn/api/core/makeEnvironmentProviders 进行包装
  return features.map(feature => feature.providers);
}
