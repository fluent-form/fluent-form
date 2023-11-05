import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { MinusOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideFluentForm, withAllWidgets, withStaticExpression } from 'ngx-fluent-form';

registerLocaleData(zh);

export default {
  imports: [
    NzIconModule.forRoot([
      PlusOutline,
      MinusOutline
    ]),
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    provideFluentForm(
      withAllWidgets(),
      withStaticExpression()
    )
  ]
};
