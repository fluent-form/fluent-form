import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { date, embed, form, number, switcher, text, textarea } from 'projects/ngx-fluent-form/src/public-api';

class User {
  id!: number;
  fullName!: string;
  nickname!: string;
  birthday!: number;
  enabled: boolean = true;
  age!: number;
  detail!: UserDetail;
}

class UserDetail {
  intro!: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  expandId?: number;

  searchSchema = form(
    text('fullName').span(6).placeholder('请输入'),
    date('birthday').span(6),
    switcher('enabled').span(2).placeholder(['有效', '无效'])
  );
  searchModel: User;

  schema = form(
    text('fullName').span(6).placeholder('请输入').label('全称').required(true).listener({
      input: console.log
    }).property({
      id: 'id'
    }),
    text('nickname').span(6).placeholder('请输入').label('昵称'),
    date('birthday').span(6).label('生日').listener({
      nzOnOpenChange: () => console.log(111),
    }).property({
      nzId: 'id'
    }),
    switcher('enabled').span(2).placeholder(['有效', '无效']).label('状态'),
    number('age').span(4).placeholder('请输入').label('年龄'),
    embed('detail').span(24).label('详情').schema(form(
      textarea('intro').rows(5).span(12).placeholder('请输入').label('简介'),
    ))
  );

  data: any[] = [
    {
      id: 1,
      fullName: 'AAA',
      nickname: 'AAA昵称',
      birthday: Date.now(),
      enabled: true,
      age: 30,
      detail: {
        intro: '简介咖啡机按钮可点击饭卡喀什酱豆腐咖啡机'
      }
    },
    {
      id: 2,
      fullName: 'BBB',
      nickname: 'BBB昵称',
      birthday: Date.now(),
      age: 25,
      enabled: true,
    },
    {
      id: 3,
      fullName: 'CCC',
      nickname: 'CCC昵称',
      birthday: Date.now(),
      age: 20,
      enabled: true,
    },
  ];

  formSpinning = false;

  constructor(private msg: NzMessageService) {
    this.searchModel = new User();
    this.searchModel.detail = new UserDetail();
  }

  ngOnInit(): void { }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandId = id;
    } else {
      this.expandId = 0;
    }
  }

  onAdd() {
    if (this.data[0]?.id) {
      this.data = [new User()].concat(this.data)
    }
    this.expandId = undefined
  }

  onSubmit(entity: User, model: User) {
    this.formSpinning = true;

    setTimeout(() => {
      this.formSpinning = false;
      console.log(entity);
      Object.assign(entity, model);
      entity.id ??= this.data.length;
      this.msg.success('保存成功')
      this.expandId = 0
    }, 500);
  }

  onCancel() {
    if (!this.data[0]?.id) {
      this.data.shift();
      this.data = this.data.slice();
    }
    this.expandId = 0
  }
}
