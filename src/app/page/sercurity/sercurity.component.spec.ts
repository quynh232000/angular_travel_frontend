import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SercurityComponent } from './sercurity.component';

describe('SercurityComponent', () => {
  let component: SercurityComponent;
  let fixture: ComponentFixture<SercurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SercurityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SercurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
