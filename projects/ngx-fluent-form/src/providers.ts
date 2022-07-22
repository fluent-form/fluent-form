import { ComponentFactoryResolver, inject, InjectionToken, Injector } from '@angular/core';
import { FluentTemplateComponent } from './components/fluent-template/fluent-template.component';

/** 组件模板实例注入令牌 */
export const COMPONENT_TEMPLATE_REF_TOKEN = new InjectionToken('ComponentTemplateRef', {
  providedIn: 'root',
  factory: () => {
    // TODO v14.1 后使用 createComponent() 替代 ComponentFactoryResolver
    const resolver = inject(ComponentFactoryResolver);
    const injector = inject(Injector);
    const { instance } = resolver.resolveComponentFactory(FluentTemplateComponent).create(injector);
    return instance.componentTemplate;
  }
});
