import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandComponent { }
