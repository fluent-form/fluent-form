import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceCompactItemDirective } from './space-compact-item.directive';

describe('Space compact item', () => {
  // let component: SpaceCompactItemTestComponent;
  let fixture: ComponentFixture<SpaceCompactItemTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()]
    }).compileComponents();
    fixture = TestBed.createComponent(SpaceCompactItemTestComponent);
    // component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not be apply compact classes', () => {
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button[nz-button]');
    expect(buttonElement.classList).not.toContain('ant-btn-compact-item');
  });
});

@Component({
  standalone: true,
  imports: [
    NzSpaceCompactItemDirective,
    NzButtonModule
  ],
  template: `
    <button nz-button nzType="primary" nzSpaceCompactItem="btn">btn</button>
  `
})
class SpaceCompactItemTestComponent { }
