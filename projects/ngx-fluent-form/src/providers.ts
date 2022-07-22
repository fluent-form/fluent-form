import { InjectionToken, Provider, ViewContainerRef } from '@angular/core';
import { ComponentTemplateRef, FluentTemplateComponent } from './components/fluent-template/fluent-template.component';
import { Obj } from './type';

/** 组件模板实例注入令牌 */
export const COMPONENT_TEMPLATE_REF_TOKEN = new InjectionToken<ComponentTemplateRef<Obj>>('ComponentTemplate');

/** 组件模板实例提供者 */
export const COMPONENT_TEMPLATE_REF_PROVIDER: Provider = {
  provide: COMPONENT_TEMPLATE_REF_TOKEN,
  useFactory: (viewContainerRef: ViewContainerRef) => {
    const { instance } = viewContainerRef.createComponent(FluentTemplateComponent);
    return instance.componentTemplate;
  },
  deps: [ViewContainerRef]
};