import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutaccountComponent } from './layoutaccount.component';

describe('LayoutaccountComponent', () => {
  let component: LayoutaccountComponent;
  let fixture: ComponentFixture<LayoutaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutaccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
