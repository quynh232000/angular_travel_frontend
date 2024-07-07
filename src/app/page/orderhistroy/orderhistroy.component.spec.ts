import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderhistroyComponent } from './orderhistroy.component';

describe('OrderhistroyComponent', () => {
  let component: OrderhistroyComponent;
  let fixture: ComponentFixture<OrderhistroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderhistroyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderhistroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
